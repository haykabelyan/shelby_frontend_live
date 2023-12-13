import { useEffect, useState } from 'react';
import { Slider } from '../components/Slider';
import { HotTours } from '../components/HotTours';
import { OurRatings } from '../components/OurRatings';
import { MainTours } from '../components/MainTours';
import { DemandedTours } from '../components/DemandedTours';
import { ScrollTop } from '../components/ScrollTop';
import { getSavedDataFromLocalStorage } from '../components/Header';

export function HomePage() {
    const savedData = localStorage.getItem('fetchedData');
    const [homePageLabel, setHomePageLabel] = useState({});
    const [slider, setSlider] = useState([]);
    const [hotTours, setHotTours] = useState([]);
    const [ourRatings, setOurRatings] = useState([]);
    const [mainTours, setMainTours] = useState([]);
    const [demandedTours, setDemandedTours] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadingData();
    }, [savedData]);


    async function loadingData() {

        const data = getSavedDataFromLocalStorage();
        if (data) {
            setHomePageLabel(data.homePageLabelData);
            setSlider(data.sliderData);
            setHotTours(data.hotToursData);
            setOurRatings(data.ourRatingsData);
            setMainTours(data.mainToursData);
            setDemandedTours(data.demandedToursData);
        }
    }


    return (
        <div className='HomePage'>
            <Slider slider={slider} />
            <HotTours hotTours={hotTours} homePageLabel={homePageLabel} />
            <OurRatings ourRatings={ourRatings} homePageLabel={homePageLabel} />
            <MainTours mainTours={mainTours} homePageLabel={homePageLabel} />
            <DemandedTours demandedTours={demandedTours} />
            <ScrollTop />
        </div>
    )
}
