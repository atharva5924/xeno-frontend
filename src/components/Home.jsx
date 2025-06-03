import React from "react";
import About from "./About";
import Banner from "./Banner";
import Facility from "./Facility";
import Footer from "./Footer";
import Header from "./Header";
import Mentor from "./Mentor";
import Navbar from "./Navbar";
import Popular from "./Popular";
import Service from "./Service";
import "./../App.css";

const Home = () => {
  return <> <Navbar />
  <Header />
  <About/>
  <Service />
  <Popular />
  <Facility />
  <Mentor />
  <Banner />
  <Footer />
  </>
};

export default Home;
