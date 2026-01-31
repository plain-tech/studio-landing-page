import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import UseCases from "@/components/UseCases";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />

      <Container>
        {/* Use Cases Section */}
        <UseCases />

        {/* Testimonials */}
        <Section
          id="testimonials"
          title="What designers are saying:"
          description=""
        >
          <Testimonials />
        </Section>

        {/* CTA */}
        <CTA />

        {/* Pricing */}
        <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. Start free, upgrade when you need more."
        >
          <Pricing />
        </Section>

        {/* FAQ */}
        <FAQ />
      </Container>
    </>
  );
};

export default HomePage;
