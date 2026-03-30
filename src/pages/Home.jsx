import Hero from '../components/sections/Hero';
import CarouselSection from '../components/sections/CarouselSection';

const Home = () => {
    const inaugurationImages = [
        '/images/inauguration1.jpeg',
        '/images/inauguration2.jpeg',
        '/images/inauguration3.jpeg',
    ];

    const pastEventImages = [
        '/images/event1.jpeg',
        '/images/event2.jpeg',
        '/images/event3.jpeg',
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
