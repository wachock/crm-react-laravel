import React from 'react'
import ContactBanner from '../Components/Contact/ContactBanner'
import ContactForm from '../Components/Contact/ContactForm'
import Help from '../Components/Contact/Help'
import Footer from '../Layouts/Footer'
import Header from '../Layouts/Header'

export default function Contact() {
  return (
    <div>
        <Header />
          <div className='info-page'>
            <ContactBanner/>
            <Help/>
            <ContactForm/>
          </div>
        <Footer />
    </div>
  )
}
