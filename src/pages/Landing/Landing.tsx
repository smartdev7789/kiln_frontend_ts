import Section1Component from "../../components/LandingComponent/Section1Component";
import Section2Component from "../../components/LandingComponent/Section2Component";
import Section3Component from "../../components/LandingComponent/Section3Component";
import Section4Component from "../../components/LandingComponent/Section4Component";
import Section5Component from "../../components/LandingComponent/Section5Component";
import Section6Component from "../../components/LandingComponent/Section6Component";
import Section7Component from "../../components/LandingComponent/Section7Component";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar/>
      <Section1Component/>
      <Section2Component/>
      <Section3Component/>
      <Section4Component/>
      <Section5Component/>
      <Section6Component/>
      <Section7Component/>
      <Footer/>
    </>
  );
};

export default Landing;
