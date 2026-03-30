import Section from '../ui/Section';
import Container from '../ui/Container';
import { ImageGallery } from '../ui/Carousel';
import GradientText from '../ui/GradientText';

const CarouselSection = ({ title, subtitle, images }) => {
    const imageObjects = images.map((url, i) => ({
        title: `Image ${i + 1}`,
        url,
    }));

    return (
        <Section>
            <Container>
                <div className="text-center mb-12">
                    <GradientText tag="h2">{title}</GradientText>
                    {subtitle && <p className="text-slate-400 mt-4">{subtitle}</p>}
                </div>

                {/* Decorative top border accent */}
                <div
                    style={{
                        width: '120px',
                        height: '2px',
                        margin: '0 auto 48px',
                        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(59,130,246,0.8), transparent)',
                        borderRadius: '2px',
                    }}
                />

                <ImageGallery images={imageObjects} />

                {/* Decorative bottom border accent */}
                <div
                    style={{
                        width: '120px',
                        height: '2px',
                        margin: '48px auto 0',
                        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.8), rgba(139,92,246,0.8), transparent)',
                        borderRadius: '2px',
                    }}
                />
            </Container>
        </Section>
    );
};

export default CarouselSection;
