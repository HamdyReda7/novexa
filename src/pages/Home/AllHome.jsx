import About from "../About/About";
import Build from "../Build/Build";
import Services from "../Services/Services";
import Contact from "../ContactUs/ContactUs";
import Header from "./Header";
import Testimonials from "../../components/Testimonials/Testimonials";
import useTranslation from "../../hooks/useTranslation";
import SEO from "../../components/SEO/SEO";

function AllHome() {
    const { t } = useTranslation();

    return (
        <div className="home-page">
            <SEO pageKey="home" />
            <Header />
            <Services />
            <Build />
            <Testimonials />
            <About />
            <Contact />
        </div>
    );
}

export default AllHome;
