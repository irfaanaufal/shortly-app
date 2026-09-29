import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { ChevronRight } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            title="Pengaturan Profil"
            subtitle="Perbarui informasi akun dan keamanan"
        >
            <Head title="Pengaturan Profil" />

            <div className="min-h-screen bg-neutral-50 px-4 py-12 antialiased transition-colors duration-200 dark:bg-[#121212] sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    {/* Header Path */}
                    <div className="text-neutral-450 mb-6 flex items-center gap-2 text-xs font-semibold dark:text-neutral-500">
                        <Link
                            href={route('dashboard')}
                            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                        >
                            Dashboard
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-neutral-900 dark:text-neutral-50">
                            Pengaturan Profil
                        </span>
                    </div>

                    <div className="space-y-6">
                        {/* Profile Info Card */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#1e1e1e] sm:p-8">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="w-full"
                            />
                        </div>

                        {/* Password Update Card */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#1e1e1e] sm:p-8">
                            <UpdatePasswordForm className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
