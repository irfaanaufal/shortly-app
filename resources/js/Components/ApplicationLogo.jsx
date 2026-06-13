// PENTING: Ganti 'company-logo.png' dengan nama file logo Anda yang sebenarnya!
import companyLogo from '../../images/logo.png';

export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src={companyLogo}
            alt="Company Logo"
            style={{ objectFit: 'contain' }}
        />
    );
}
