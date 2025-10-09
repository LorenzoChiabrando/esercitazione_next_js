'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

const RegisterUserSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'A valid email address is required.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    redirectTo: z.string().optional(),
});

export type RegisterState =
    | { status: 'success'; message: string }
    | { status: 'error'; message: string }
    | undefined;

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
        // We'll also log the error to the console for now
        console.error(error);
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
        // We'll also log the error to the console for now
        console.error(error);
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    throw new Error('Failed to Delete Invoice');
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}

export async function registerUser(
    prevState: RegisterState,
    formData: FormData,
): Promise<RegisterState> {
    const parsedForm = RegisterUserSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        redirectTo: formData.get('redirectTo'),
    });

    if (!parsedForm.success) {
        const firstError = parsedForm.error.errors[0]?.message ?? 'Invalid registration details.';
        return { status: 'error', message: firstError };
    }

    const { name, email, password, redirectTo } = parsedForm.data;

    try {
        const existingUser = await sql<{ id: string }[]>`SELECT id FROM users WHERE email=${email}`;
        if (existingUser.length > 0) {
            return { status: 'error', message: 'An account with this email already exists.' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;

        await signIn('credentials', {
            email,
            password,
            redirectTo: redirectTo ?? '/dashboard',
        });

        return { status: 'success', message: 'Registration successful. Redirecting…' };
    } catch (error) {
        console.error('Failed to register user:', error);
        return { status: 'error', message: 'Registration failed. Please try again.' };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}