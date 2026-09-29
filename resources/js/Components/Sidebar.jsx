import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Sidebar({ mobileOpen = false, onMobileClose }) {
    const user = usePage().props.auth.user;
    const [hovered, setHovered] = useState(false);
    const expanded = hovered;

    const isDashboardActive = route().current('dashboard');
    const isSystemsActive = route().current('admin.systems.*');
    const isProfileActive = route().current('profile.edit');

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const avatarUrl = user.avatar_url || user.profile_photo_url || null;
    const initials = user.name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
    const firstName = user.name.split(' ')[0];

    const navItems = [];
    navItems.push({
        href: route('dashboard'),
        active: isDashboardActive,
        label: 'Dashboard',
        icon: <IconHome />,
    });
    if (user.level !== null && user.level <= 4) {
        navItems.push({
            href: route('admin.systems.index'),
            active: isSystemsActive,
            label: 'Kelola Sistem',
            icon: <IconSystem />,
        });
    }

    const desktopSidebar = (
        <aside
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ width: expanded ? '216px' : '68px' }}
            className="z-20 hidden h-[calc(100vh-2rem)] flex-shrink-0 flex-col overflow-hidden rounded-[28px] border border-gray-200/80 bg-white py-4 shadow-md transition-all duration-300 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 md:flex"
        >
            <div
                className={`mb-2 flex items-center px-3 ${expanded ? '' : 'justify-center'}`}
            >
                <Link href="/" className="block">
                    <ApplicationLogo collapsed={!expanded} />
                </Link>
            </div>

            <hr className="mx-3 mb-3 border-gray-100 dark:border-zinc-800" />

            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2">
                {navItems.map((item) => (
                    <NavItem
                        key={item.label}
                        href={item.href}
                        active={item.active}
                        label={item.label}
                        expanded={expanded}
                    >
                        {item.icon}
                    </NavItem>
                ))}
            </nav>

            <div className="flex flex-col gap-0.5 px-2 pt-2">
                <hr className="mx-1 mb-2 border-gray-100 dark:border-zinc-800" />

                <button
                    onClick={handleLogout}
                    className={`flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-2xl text-gray-400 transition duration-150 hover:bg-rose-50 hover:text-rose-500 dark:text-zinc-500 dark:hover:bg-rose-950/20 ${expanded ? 'gap-3 px-3' : 'justify-center px-0'}`}
                    title="Keluar"
                >
                    <span className="flex w-[18px] shrink-0 justify-center">
                        <IconLogout />
                    </span>
                    {expanded && (
                        <span className="whitespace-nowrap text-sm font-semibold">
                            Keluar
                        </span>
                    )}
                </button>

                <AvatarWidget
                    showText={false}
                    expanded={expanded}
                    isProfileActive={isProfileActive}
                    avatarUrl={avatarUrl}
                    initials={initials}
                    firstName={firstName}
                    user={user}
                    onMobileClose={onMobileClose}
                />
            </div>
        </aside>
    );

    const backdropClasses = mobileOpen
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none';

    const panelClasses = mobileOpen ? 'translate-x-0' : 'translate-x-full';

    const mobileSidebar = (
        <>
            <div
                className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-md transition-opacity duration-300 ease-in-out md:hidden ${backdropClasses}`}
                onClick={onMobileClose}
            />

            <aside
                className={`fixed right-0 top-0 z-40 flex h-full w-[75vw] max-w-[288px] flex-col rounded-l-3xl bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] dark:bg-zinc-950 md:hidden ${panelClasses}`}
            >
                <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-100/80 px-5 dark:border-zinc-800/80">
                    <ApplicationLogo collapsed={false} />
                    <button
                        onClick={onMobileClose}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gray-100 text-gray-400 transition-all duration-150 hover:bg-gray-200 hover:text-gray-600 active:scale-95 dark:bg-zinc-800 dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
                        aria-label="Tutup menu"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.label}
                            href={item.href}
                            active={item.active}
                            label={item.label}
                            expanded={true}
                            onClick={onMobileClose}
                        >
                            {item.icon}
                        </NavItem>
                    ))}
                </nav>

                <div className="flex flex-col gap-0.5 border-t border-gray-100/80 px-3 pb-6 pt-3 dark:border-zinc-800/80">
                    <AvatarWidget
                        showText={true}
                        expanded={true}
                        isProfileActive={isProfileActive}
                        avatarUrl={avatarUrl}
                        initials={initials}
                        firstName={firstName}
                        user={user}
                        onMobileClose={onMobileClose}
                    />
                    <button
                        onClick={handleLogout}
                        className="flex h-11 w-full cursor-pointer items-center gap-3 rounded-2xl px-3 text-gray-400 transition duration-150 hover:bg-rose-50 hover:text-rose-500 dark:text-zinc-500 dark:hover:bg-rose-950/20"
                    >
                        <span className="flex w-[18px] shrink-0 justify-center">
                            <IconLogout />
                        </span>
                        <span className="text-sm font-semibold">Keluar</span>
                    </button>
                </div>
            </aside>
        </>
    );

    return (
        <>
            {desktopSidebar}
            {mobileSidebar}
        </>
    );
}

function NavItem({ href, active, label, expanded, children, onClick }) {
    const activeClasses = active
        ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 font-semibold shadow-sm border border-indigo-100 dark:border-indigo-900/50'
        : 'text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-900/40';
    const layoutClasses = expanded ? 'gap-3 px-3' : 'justify-center px-0';

    return (
        <Link
            href={href}
            onClick={onClick}
            title={label}
            className={`flex h-11 items-center overflow-hidden rounded-2xl transition-all duration-150 ${layoutClasses} ${activeClasses}`}
        >
            <span className="flex w-[18px] shrink-0 justify-center">
                {children}
            </span>
            {expanded && (
                <span className="whitespace-nowrap text-sm font-semibold">
                    {label}
                </span>
            )}
        </Link>
    );
}

function IconHome() {
    return (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
        </svg>
    );
}
function IconSystem() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinejoin="round"
        >
            <path d="M18 6H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2Zm17-8a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm5 8H30a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2Z" />
        </svg>
    );
}
function IconLogout() {
    return (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
        </svg>
    );
}

function AvatarWidget({
    showText,
    expanded,
    isProfileActive,
    avatarUrl,
    initials,
    firstName,
    user,
    onMobileClose,
}) {
    const profileClasses = isProfileActive
        ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50'
        : 'hover:bg-gray-50 dark:hover:bg-zinc-900/40';
    const layoutClasses =
        expanded || showText ? 'gap-3 px-3' : 'justify-center px-0';
    return (
        <Link
            href={route('profile.edit')}
            onClick={onMobileClose}
            className={`flex h-11 cursor-pointer items-center overflow-hidden rounded-2xl transition-all duration-150 ${layoutClasses} ${profileClasses}`}
            title="Edit Profile"
        >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-slate-100 dark:border-zinc-700 dark:bg-zinc-800">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="avatar"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="text-[10px] font-black leading-none text-slate-600 dark:text-zinc-300">
                        {initials}
                    </span>
                )}
            </div>
            {(expanded || showText) && (
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold leading-tight text-gray-800 dark:text-zinc-200">
                        {firstName}
                    </p>
                    <p className="truncate text-[10px] leading-tight text-gray-400 dark:text-zinc-500">
                        {user.email}
                    </p>
                </div>
            )}
        </Link>
    );
}
