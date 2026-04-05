import Hero from '../components/sections/Hero';
import CarouselSection from '../components/sections/CarouselSection';

const Home = () => {
    const inaugurationImages = [
        '/images/inauguration1.png',
        '/images/inauguration2.png',
        '/images/inauguration3.png',
    ];

    const pastEventImages = [
        '/images/event1.png',
        '/images/event2.png',
        '/images/event3.png',
    ];

    return (
        <div>
            <Hero />

            <div id="inauguration">
                <CarouselSection
                    title="Our Inauguration"
                    subtitle="A grand beginning to a journey of innovation and technical excellence."
                    images={inaugurationImages}
                />
            </div>

            <div id="past-events">
                <CarouselSection
                    title="Moments from Past Events"
                    subtitle="Capture the essence of our previous tech fests and workshops."
                    images={pastEventImages}
                />
            </div>
        </div>
    );
};

export default Home;
