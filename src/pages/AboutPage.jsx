import { useEffect, useState } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
import ProgressBar from "@ramonak/react-progress-bar";
import { HotTours } from '../components/HotTours';
import { getSavedDataFromLocalStorage } from '../components/Header';
import '../scss/AboutPage.scss';

export function AboutPage() {
    const savedData = localStorage.getItem('fetchedData');
    const [hotTours, setHotTours] = useState([]);
    const [homePageLabel, setHomePageLabel] = useState({});
    const [aboutProgress, setAboutProgress] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        loadingData();
        window.scrollTo(0, 0);
    }, [savedData]);

    async function loadingData() {
        const data = getSavedDataFromLocalStorage();
        if (data) {
            setHotTours(data.hotToursData);
            setHomePageLabel(data.homePageLabelData);
            setAboutProgress(data.progressData);
        }
    }

    return (
        <div className='AboutPage'>
            <div className='background'></div>

            <HotTours hotTours={hotTours} homePageLabel={homePageLabel} />

            <div className='progress-container'>
                {
                    aboutProgress.map(el =>
                        <div className='box' key={el.id}>
                            <div className='title'>{el.title}</div>

                            <ScrollTrigger onEnter={() => setVisible(true)}>
                                {
                                    visible && <ProgressBar className="progress-bar"
                                        completed={el.percent}
                                        animateOnRender
                                        transitionDuration="2s"
                                        transitionTimingFunction="linear"
                                        height='14px'
                                        borderRadius="0"
                                        isLabelVisible={false}
                                        bgColor="var(--white)"
                                        baseBgColor="var(--whiteAlpha)"
                                    />
                                }
                            </ScrollTrigger>
                        </div>
                    )
                }
            </div >
        </div>
    )
}