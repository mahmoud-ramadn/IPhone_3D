import  Hero  from "./components/Hero"
import Highlights from "./components/Highlights"
import NavBar from "./components/NavBar"
import Model from "./components/Model"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Footer from "./components/Footer"
import * as Sentry from '@sentry/react';

const App = () => {
 

  return (
    <div className=" bg-black">
    <NavBar/>
      <Hero/>
      <Highlights/>
      <Model />
      <Features />
      <HowItWorks />
      <Footer/>
    </div>
  )
}

export default Sentry.withProfiler(App);