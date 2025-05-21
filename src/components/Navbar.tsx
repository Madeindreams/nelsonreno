import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

type NavbarProps = {
    setSection: (section: 'home' | 'services' | 'about' | 'contact') => void;
};

const Navbar = ({ setSection }: NavbarProps) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 sticky-top" style={{ zIndex: 1000 }}>
            <div className="container-fluid">
                {/* Logo + Brand */}
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={logo} alt="NelsonReno Logo" height="40" className="me-2" />
                    NelsonReno.ca
                </a>

                {/* Always-visible Language Dropdown */}
                <ul className="navbar-nav ms-auto flex-row d-none d-lg-flex">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="langDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            🌐 {t('language')}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="langDropdown">
                            <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>🇬🇧 English</button></li>
                            <li><button className="dropdown-item" onClick={() => changeLanguage('fr')}>🇫🇷 Français</button></li>
                            <li><button className="dropdown-item" onClick={() => changeLanguage('es')}>🇪🇸 Español</button></li>
                            <li><button className="dropdown-item" onClick={() => changeLanguage('ja')}>🇯🇵 日本語</button></li>
                        </ul>
                    </li>
                </ul>

                {/* Toggler for mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible nav links */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setSection('home')}>
                                {t('nav.home')}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setSection('services')}>
                                {t('nav.services')}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setSection('about')}>
                                {t('nav.about')}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setSection('contact')}>
                                {t('nav.contact')}
                            </a>
                        </li>

                        {/* Mobile language dropdown */}
                        <li className="nav-item dropdown d-lg-none">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="langDropdownMobile"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                🌐 {t('language')}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="langDropdownMobile">
                                <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>🇬🇧 English</button></li>
                                <li><button className="dropdown-item" onClick={() => changeLanguage('fr')}>🇫🇷 Français</button></li>
                                <li><button className="dropdown-item" onClick={() => changeLanguage('es')}>🇪🇸 Español</button></li>
                                <li><button className="dropdown-item" onClick={() => changeLanguage('ja')}>🇯🇵 日本語</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
