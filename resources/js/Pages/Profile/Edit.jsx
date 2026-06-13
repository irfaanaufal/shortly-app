import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import * as Icons from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Pengaturan Profil" />

            <div className="min-h-screen bg-neutral-50 dark:bg-[#121212] py-12 px-4 sm:px-6 lg:px-8 antialiased transition-colors duration-200">
                <div className="max-w-3xl mx-auto">
                    {/* Header Path */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-450 dark:text-neutral-500 mb-6">
                        <Link href={route('dashboard')} className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                            Dashboard
                        </Link>
                        <Icons.ChevronRight className="w-3 h-3" />
                        <span className="text-neutral-900 dark:text-neutral-50">Pengaturan Profil</span>
                    </div>

                    <div className="space-y-6">
                        {/* Profile Info Card */}
                        <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 rounded-2xl shadow-sm">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="w-full"
                            />
                        </div>

                        {/* Password Update Card */}
                        <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 rounded-2xl shadow-sm">
                            <UpdatePasswordForm className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
