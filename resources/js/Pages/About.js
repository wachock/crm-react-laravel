import React from 'react'
import Footer from '../Layouts/Footer'
import Header from '../Layouts/Header'

export default function About() {
  return (
    <div>
        <Header />
        <div className='container'>
          <div className='info-page'>
            <div className='bodyinner'>
              <h1>Qui sommes-nous ?</h1>
              <p>La mission de Yeliko ? Accompagner les particuliers en perte d'autonomie pour garantire le droit au maintient à domicile
Yeliko accompagne pour le maintien à domicile d'une personne âgée, en perte d'autonomie ou en situation de handicap et vous permet une déduction d'impôt de 50% grâce à notre déclaration service à la personne. Le modèle plateforme de Yeliko, de par son fonctionnement en ligne permet une économie moyenne de 30% face aux modèles prestataire et mandataire, tout en permettant une rémunération plus élevée aux professionnels de santé que nous référençons.</p>
              <p>Yeliko est né de la volonté de résoudre les difficultés rencontrées en tant qu'aidant familiale pour trouver une aide à domicile de confiance et bienveillante pour prendre soin de sa soeur atteinte de nombreux AVC.</p>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}
