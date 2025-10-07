import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '@/styles/Home.css'
import logo from '@/assets/logo.svg';
import Header from '@/components/Header';
function Home() {
    return (
        <>
            <div className='title-container'>
                <img className='home-logo' src={logo} alt='Mots Crois&eacute;s' />
                <h1 className='title-text'>
                    Mots Crois&eacute;s
                </h1>
            </div>
            <Header notHome={false} />
        </>
    )
}

export default Home
