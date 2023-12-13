import { useEffect, useState } from 'react';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { SelectLanguage } from './SelectLanguage';
import '../scss/Header.scss';
import axios from '../axios';

export async function fetchData() {
    try {
        const language = localStorage.getItem('shelby-Language') || 'en';

        const [
            navbarData,
            homePageLabelData,
            sliderData,
            hotToursData,
            ourRatingsData,
            mainToursData,
            demandedToursData,
            bookingPageLabelData,
            citiesData,
            progressData,
            footerData
        ] = await Promise.all([
            axios.get(`navbar?lang=${language}`),
            axios.get(`home_page_label?lang=${language}`),
            axios.get(`slider?lang=${language}`),
            axios.get(`hottour?lang=${language}`),
            axios.get(`ourrating?lang=${language}`),
            axios.get(`maintour?lang=${language}`),
            axios.get(`demandedtour?lang=${language}`),
            axios.get(`booking_page_label?lang=${language}`),
            axios.get(`city?lang=${language}`),
            axios.get(`about_page_progress?lang=${language}`),
            axios.get(`footer?lang=${language}`)
        ]);

        const data = {
            navbarData: navbarData.data,
            homePageLabelData: homePageLabelData.data,
            sliderData: sliderData.data,
            hotToursData: hotToursData.data,
            ourRatingsData: ourRatingsData.data,
            mainToursData: mainToursData.data,
            demandedToursData: demandedToursData.data,
            bookingPageLabelData: bookingPageLabelData.data,
            citiesData: citiesData.data,
            progressData: progressData.data,
            footerData: footerData.data
        };

        localStorage.setItem('fetchedData', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("An error occurred:", error);
        throw error;
    }
}

export function getSavedDataFromLocalStorage() {
    const savedData = localStorage.getItem('fetchedData');
    if (savedData) {
        return JSON.parse(savedData);
    }
    return null;
}


export function Header({ navbar }) {

    const navigate = useNavigate();
    const [scrollDown, setScrollDown] = useState(false);
    const [showNavBar, setShowNavBar] = useState(false);


    useEffect(() => {
        window.addEventListener('scroll', onScrollWindow);
    }, []);

    const onScrollWindow = () => {
        if (window.innerWidth < 1250) {
            setScrollDown(false);
        } else {
            setShowNavBar(false);
            if (window.scrollY > 750) setScrollDown(true);
            else setScrollDown(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className={scrollDown ? 'Header HeaderOnScroll' : 'Header'}>

            <div className="LeftSide">
                <div className='logo' onClick={() => navigate('/')} >
                    <img src={scrollDown ? '/images/logo-on-scroll.png' : '/images/logo.png'} alt='logo' />
                </div>

                <div id="menu-bar" className="fas fa-bars" onClick={() => setShowNavBar(!showNavBar)}></div>

                <nav className={showNavBar ? 'active' : ''}>
                    {
                        navbar.map(el => (
                            <Link key={el.id} to={el.route} onClick={() => setShowNavBar(false)}>
                                {el.title}
                            </Link>
                        ))
                    }
                </nav>
            </div>

            <div className="RightSide">
                <div className='info'>
                    <i className='fa-solid fa-phone'></i>
                    <a className='infoTel' href='tel:555 6785'>Call Us: 555 6785</a>

                    <a href="https://www.facebook.com/shelby.cjsco" target='_blank' rel='noreferrer'>
                        <i className='fa-brands fa-facebook-f'></i>
                    </a>

                    <a href="https://twitter.com/" target='_blank' rel='noreferrer'>
                        <i className='fa-brands fa-twitter'></i>
                    </a>

                    <a href="https://www.pinterest.com/" target='_blank' rel='noreferrer'>
                        <i className='fa-brands fa-pinterest'></i>
                    </a>
                </div>
                {localStorage.getItem('token') ? <button onClick={handleLogout} className='Logout'>Logout</button> : <SelectLanguage />}
            </div>

        </div>
    )
}
