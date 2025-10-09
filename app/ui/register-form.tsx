'use client';

import { lusitana } from '@/app/ui/fonts';
import { Button } from './button';
import { useActionState } from 'react';
import { registerUser } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
    AtSymbolIcon,
    KeyIcon,
    UserIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [state, formAction, isPending] = useActionState(registerUser, undefined);

    return (
        <form action={formAction} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Create your account.
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="name"
                        >
                            Full name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                required
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Create a secure password"
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <Button className="mt-4 w-full" aria-disabled={isPending} disabled={isPending}>
                    Create account
                </Button>
                <div
                    className="flex h-8 items-end space-x-2"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {state?.status === 'error' && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{state.message}</p>
                        </>
                    )}
                    {state?.status === 'success' && (
                        <>
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            <p className="text-sm text-green-600">{state.message}</p>
                        </>
                    )}
                </div>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-blue-500 hover:underline">
                        Log in instead
                    </Link>
                </p>
            </div>
        </form>
    );
}
