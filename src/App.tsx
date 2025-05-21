import { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "./components/Navbar.tsx";
import heroLogo from './assets/logo.png';
import heroLogo2 from './assets/logo.png';
import homeBg from './assets/bridge.png';
import raceBg from './assets/race.mp4';
import steamBg from './assets/ssmoyier.mp4';
import gyroBg from './assets/gyro.mp4';

import ContactForm from './components/ContactForm';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
`;

const FullWidthSection = styled.div`
    width: 100%;
    padding: 0;
    margin: 0;
`;

const Hero = styled.header`
    flex: 1;
    position: relative;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
`;

const Background = styled(motion.div)<{ $img?: string }>`
    background-image: ${({ $img }) => ($img ? `url(${$img})` : 'none')};
    background-size: cover;
    background-position: center;
    filter: brightness(1);
    position: absolute;
    inset: 0;
    z-index: 1;
`;

const VideoBackground = styled(motion.video)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: 0;
`;


const HeroContent = styled(motion.div)`
    position: relative;
    z-index: 2;
    max-width: 1000px;
    width: 100%;
    padding: 3rem 2rem;
    margin: auto;
    text-align: center;
    color: #000;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 1rem;

    border: 1px solid rgba(85, 86, 113, 0.4);
    box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.25),
            0 4px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
        font-size: 0.9rem;
    }

    &:hover {
        box-shadow:
                0 12px 32px rgba(0, 0, 0, 0.3),
                0 6px 18px rgba(0, 0, 0, 0.15);
    }
`;

const Paragraph = styled.p`
  max-width: 600px;
  margin: 0 auto 1rem;
  text-align: center;
`;


const Footer = styled.footer`
    background-color: #212529;
    color: #fff;
    text-align: center;
    padding: 1rem 0;
    width: 100%;
    height: 80px;
    z-index: 99;
`;

function App() {
    const { t } = useTranslation();
    const [section, setSection] = useState<'home' | 'services' | 'about' | 'contact'>('home');
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navbarCollapse = document.getElementById('navbarNav');

        navLinks.forEach(link =>
            link.addEventListener('click', () => {
                if (navbarCollapse?.classList.contains('show')) {
                    const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
                        toggle: true,
                    });
                    bsCollapse.hide();
                }
            })
        );
    }, []);

    const sectionContent = {
        home: {
            title: t('title'),
            subtitle: t('subtitle'),
            description: t('welcome'),
            type: 'image',
            background: homeBg,
            logo: heroLogo,
        },
        services: {
            title: t('services.title'),
            subtitle: t('services.subtitle'),
            description: '',
            type: 'video',
            background: raceBg,
            logo: heroLogo2,
        },
        about: {
            title: t('about.title'),
            subtitle: t('about.subtitle'),
            type: 'video',
            background: steamBg,
            logo: heroLogo2,
        },
        contact: {
            title: t('contact.title'),
            subtitle: t('contact.subtitle'),
            type: 'video',
            background: gyroBg,
            logo: heroLogo2,
        },
    }[section];

    return (
        <Wrapper>
            {/* Navbar */}
            <FullWidthSection>
                <Navbar setSection={setSection} />
            </FullWidthSection>

            {/* Hero Section */}
            <Hero>
                <AnimatePresence mode="wait">
                    {sectionContent.type === 'image' ? (
                        <Background
                            key={sectionContent.background}
                            $img={sectionContent.background}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        />
                    ) : (
                        <VideoBackground
                            key={sectionContent.background}
                            autoPlay
                            muted
                            loop
                            playsInline
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <source src={sectionContent.background} type="video/mp4" />
                        </VideoBackground>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <HeroContent
                        key={section}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src={sectionContent.logo}
                            alt="NelsonReno Hero Logo"
                            style={{ maxHeight: '200px', width: 'auto' }}
                            className="mb-0"
                        />
                        <h1>{sectionContent.title}</h1>
                        <p className="lead">{sectionContent.subtitle}</p>
                        {section === 'services' && (
                            <>
                                <p>{t('services.intro')}</p>
                                <ul className="text-start d-inline-block">
                                    {(t('services.list', { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                <p>{t('services.engineering')}</p>
                                <Paragraph dangerouslySetInnerHTML={{
                                    __html: t('services.cta', {
                                        aboutLink: '<a href="#about" class="text-primary text-decoration-underline">visit our About page</a>',
                                        interpolation: { escapeValue: false }
                                    })
                                }} />
                            </>
                        )}

                        {section === 'about' && (
                            <>
                                <p>{t('about.intro')}</p>
                                <p>{t('about.career')}</p>
                                <p>{t('about.cta')}</p>
                            </>
                        )}

                        {section === 'contact' && (
                            <>
                                <Paragraph>{t('contact.intro')}</Paragraph>
                                <Paragraph>{t('contact.community')}</Paragraph>
                                <Paragraph>{t('contact.cta')}</Paragraph>
                            </>
                        )}

                        {!(section === 'services' || section === 'about' || section === 'contact') && (
                            <p>{sectionContent.description}</p>
                        )}
                        {(section === 'home') && (
                            <a href="#contact" className="btn btn-primary btn-lg mt-3" onClick={() => setShowForm(true)}>
                                {t('contactBtn')}
                            </a>
                        )}

                        {(section === 'contact') && (
                            <a href="#contact" className="btn btn-primary btn-lg mt-3" onClick={() => setShowForm(true)}>
                                {t('contactBtn')}
                            </a>
                        )}
                    </HeroContent>
                </AnimatePresence>
            </Hero>

            <ContactForm visible={showForm} onClose={() => setShowForm(false)} />

            {/* Footer */}
            <Footer>
                &copy; {new Date().getFullYear()} NelsonReno.ca · {t('footer')}
            </Footer>
        </Wrapper>
    );
}

export default App;
