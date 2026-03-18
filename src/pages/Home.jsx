import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';

const Home = () => {
    const inaugurationImages = [
        '/images/inauguration_moment_1773842356873.png',
        '/images/tech_conference_hall_1773842391237.png',
        '/images/student_coding_event_1773842375785.png',
    ];

    const pastEventImages = [
        '/images/student_coding_event_1773842375785.png',
        '/images/tech_conference_hall_1773842391237.png',
        '/images/inauguration_moment_1773842356873.png',
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
