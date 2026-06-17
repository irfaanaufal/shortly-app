import { usePage } from '@inertiajs/react';

export default function ApplicationLogo(props) {
    const { logo_url } = usePage().props;

    return (
        <img
            {...props}
            src={logo_url}
            alt="Company Logo"
            style={{ objectFit: 'contain' }}
        />
    );
}
