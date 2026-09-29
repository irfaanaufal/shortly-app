import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import Swal from 'sweetalert2';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const STATUS_TOAST_MAP = {
    'system-created': { icon: 'success', title: 'Sistem berhasil dibuat' },
    'system-updated': { icon: 'success', title: 'Sistem berhasil diperbarui' },
    'system-deleted': { icon: 'success', title: 'Sistem berhasil dihapus' },
    'system-toggled': { icon: 'success', title: 'Status sistem diperbarui' },
    'shortcut-created': { icon: 'success', title: 'Shortcut berhasil dibuat' },
    'shortcut-updated': {
        icon: 'success',
        title: 'Shortcut berhasil diperbarui',
    },
    'shortcut-deleted': { icon: 'success', title: 'Shortcut berhasil dihapus' },
    'shortcuts-updated': {
        icon: 'success',
        title: 'Shortcut berhasil diperbarui',
    },
    'profile-updated': { icon: 'success', title: 'Profil berhasil diperbarui' },
};

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch() {}

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-[#1e1e1e]">
                    <div className="p-8 text-center">
                        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
                            Terjadi Kesalahan
                        </h1>
                        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
                            Halaman tidak dapat dimuat. Silakan coba lagi.
                        </p>
                        <button
                            onClick={() => {
                                this.setState({ hasError: false });
                                window.location.reload();
                            }}
                            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
                        >
                            Muat Ulang
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ErrorBoundary>
                <App {...props} />
            </ErrorBoundary>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

router.on('success', (event) => {
    const flashStatus = event.detail.props.status;
    if (flashStatus && STATUS_TOAST_MAP[flashStatus]) {
        const toast = STATUS_TOAST_MAP[flashStatus];
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: toast.icon,
            title: toast.title,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    }
});
