import React from 'react'
import Features from '../Components/Home/Features'
import HomeBanner from '../Components/Home/HomeBanner'
import HomeFAQ from '../Components/Home/HomeFAQ'
import Reach from '../Components/Home/Reach'
import SeniorCare from '../Components/Home/SeniorCare'
import TextProfessional from '../Components/Home/TextProfessional'
import Footer from '../Layouts/Footer'
import Header from '../Layouts/Header'

export default function Home() {
  return (
    <div>
        <Header />
        <HomeBanner/>
        <TextProfessional/>
        <Reach/>
        <SeniorCare/>
        <Features/>
        <HomeFAQ/>
        <Footer />
    </div>
  )
}
