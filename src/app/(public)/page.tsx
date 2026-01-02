import { getEventSettings } from "@/app/actions/settings";
import { getHeroSection } from "@/app/actions/hero";
import { getAboutSection } from "@/app/actions/about";
import { getTracks } from "@/app/actions/tracks";
import { getSponsors, getFaqs, getGallery, getTestimonials } from "@/app/actions/content";

import IntroAnimation from "@/components/layout/IntroAnimation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tracks from "@/components/sections/Tracks";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Sponsors from "@/components/sections/Sponsors";
import Footer from "@/components/layout/Footer";
import Prizes from "@/components/sections/Prizes";
import { getPrizes } from "@/app/actions/prizes";

export const revalidate = 60;

export default async function Home() {
    // Parallel Data Fetching
    const [
        settings,
        hero,
        about,
        tracks,
        sponsors,
        faqs,
        gallery,
        testimonials,
        prizes
    ] = await Promise.all([
        getEventSettings(),
        getHeroSection(),
        getAboutSection(),
        getTracks(),
        getSponsors(),
        getFaqs(),
        getGallery(),
        getTestimonials(),
        getPrizes()
    ]);

    console.log("DEBUG PAGE hero.backgroundImageUrl:", hero.backgroundImageUrl);
    console.log("DEBUG PAGE hero.titleLine1:", hero.titleLine1);
    console.log("DEBUG PAGE settings.logoUrl:", settings.logoUrl);
    console.log("DEBUG PAGE about.mmcCard:", JSON.stringify(about.mmcCard, null, 2));
    console.log("DEBUG PAGE about.visionxCard:", JSON.stringify(about.visionxCard, null, 2));

    return (
        <>
            <IntroAnimation enabled={settings.enableIntroAnimation} />

            <div className="flex flex-col gap-0">
                <Hero data={hero} settings={settings} />
                <About data={about} />
                <Prizes prizes={prizes} />
                <Tracks tracks={tracks} />
                <Gallery images={gallery} />
                <Testimonials testimonials={testimonials} />
                <Sponsors sponsors={sponsors} />
                <FAQ faqs={faqs} />
            </div>

            <Footer settings={settings} />
        </>
    );
}
