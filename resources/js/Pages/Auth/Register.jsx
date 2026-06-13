import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Register() {
    const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : false);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: isDesktop ? 'row' : 'column', 
            backgroundColor: '#000000', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', 
            overflow: 'hidden' 
        }}>
            <Head title="Register" />

            {/* ===== BLACK SECTION (Desktop left / Mobile top) ===== */}
            <div style={{ 
                flex: isDesktop ? '1' : '0 0 22vh', 
                backgroundColor: '#000', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={isDesktop ? 150 : 60}
                    height={isDesktop ? 150 : 60}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
            </div>

            {/* ===== WHITE SECTION (Desktop right / Mobile bottom) ===== */}
            <div style={{ 
                flex: '1', 
                backgroundColor: '#fff', 
                display: 'flex', 
                alignItems: isDesktop ? 'center' : 'flex-start', 
                justifyContent: isDesktop ? 'center' : 'flex-start',
                padding: isDesktop ? '0 80px' : '18px 22px',
                borderTopLeftRadius: isDesktop ? '0' : '48px',
                overflowY: 'hidden'
            }}>
                <div style={{ width: '100%', maxWidth: isDesktop ? '400px' : 'none' }}>
                    <h1 style={{
                        fontSize: isDesktop ? '32px' : '22px',
                        fontWeight: '700',
                        color: '#111111',
                        textAlign: 'center',
                        margin: '0 0 ' + (isDesktop ? '32px' : '16px') + ' 0',
                        letterSpacing: isDesktop ? '-0.5px' : '-0.3px',
                    }}>
                        Register
                    </h1>

                    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', flex: isDesktop ? 'none' : '1 1 auto' }}>
                        {/* Name */}
                        <div style={{ marginBottom: isDesktop ? '16px' : '10px' }}>
                            <label
                                htmlFor="name"
                                style={{ 
                                    display: 'block', 
                                    fontSize: isDesktop ? '14px' : '12px', 
                                    fontWeight: '500', 
                                    color: '#111111', 
                                    marginBottom: isDesktop ? '8px' : '4px' 
                                }}
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                placeholder="Enter name"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    padding: isDesktop ? '12px 16px' : '9px 12px',
                                    fontSize: isDesktop ? '15px' : '13px',
                                    color: '#374151',
                                    backgroundColor: '#ffffff',
                                    outline: 'none',
                                }}
                            />
                            <InputError message={errors.name} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        {/* Username */}
                        <div style={{ marginBottom: isDesktop ? '16px' : '10px' }}>
                            <label
                                htmlFor="username"
                                style={{ 
                                    display: 'block', 
                                    fontSize: isDesktop ? '14px' : '12px', 
                                    fontWeight: '500', 
                                    color: '#111111', 
                                    marginBottom: isDesktop ? '8px' : '4px' 
                                }}
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                value={data.username}
                                placeholder="Enter username"
                                autoComplete="username"
                                onChange={(e) => setData('username', e.target.value.toLowerCase())}
                                required
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    padding: isDesktop ? '12px 16px' : '9px 12px',
                                    fontSize: isDesktop ? '15px' : '13px',
                                    color: '#374151',
                                    backgroundColor: '#ffffff',
                                    outline: 'none',
                                }}
                            />
                            <InputError message={errors.username} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: isDesktop ? '16px' : '10px' }}>
                            <label
                                htmlFor="email"
                                style={{ 
                                    display: 'block', 
                                    fontSize: isDesktop ? '14px' : '12px', 
                                    fontWeight: '500', 
                                    color: '#111111', 
                                    marginBottom: isDesktop ? '8px' : '4px' 
                                }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Enter email"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    padding: isDesktop ? '12px 16px' : '9px 12px',
                                    fontSize: isDesktop ? '15px' : '13px',
                                    color: '#374151',
                                    backgroundColor: '#ffffff',
                                    outline: 'none',
                                }}
                            />
                            <InputError message={errors.email} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: isDesktop ? '16px' : '10px' }}>
                            <label
                                htmlFor="password"
                                style={{ 
                                    display: 'block', 
                                    fontSize: isDesktop ? '14px' : '12px', 
                                    fontWeight: '500', 
                                    color: '#111111', 
                                    marginBottom: isDesktop ? '8px' : '4px' 
                                }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Enter password"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    padding: isDesktop ? '12px 16px' : '9px 12px',
                                    fontSize: isDesktop ? '15px' : '13px',
                                    color: '#374151',
                                    backgroundColor: '#ffffff',
                                    outline: 'none',
                                }}
                            />
                            <InputError message={errors.password} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        {/* Confirm Password */}
                        <div style={{ marginBottom: '0px' }}>
                            <label
                                htmlFor="password_confirmation"
                                style={{ 
                                    display: 'block', 
                                    fontSize: isDesktop ? '14px' : '12px', 
                                    fontWeight: '500', 
                                    color: '#111111', 
                                    marginBottom: isDesktop ? '8px' : '4px' 
                                }}
                            >
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Confirm password"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                required
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    padding: isDesktop ? '12px 16px' : '9px 12px',
                                    fontSize: isDesktop ? '15px' : '13px',
                                    color: '#374151',
                                    backgroundColor: '#ffffff',
                                    outline: 'none',
                                }}
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className={isDesktop ? 'mt-2' : 'mt-1'}
                            />
                        </div>

                        {/* Tombol Register */}
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                width: '100%',
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '12px',
                                padding: isDesktop ? '14px 0' : '10px 0',
                                fontSize: isDesktop ? '16px' : '14px',
                                fontWeight: '600',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                opacity: processing ? 0.6 : 1,
                                letterSpacing: '0.3px',
                                marginTop: isDesktop ? '24px' : '16px',
                            }}
                        >
                            Register
                        </button>
                    </form>

                    <p style={{ 
                        textAlign: 'center', 
                        fontSize: isDesktop ? '14px' : '11px', 
                        color: '#9ca3af', 
                        marginTop: isDesktop ? '28px' : '16px', 
                        marginBottom: '0' 
                    }}>
                        Already registered?{' '}
                        <Link
                            href={route('login')}
                            style={{ color: '#111111', fontWeight: '700', textDecoration: 'none' }}
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
