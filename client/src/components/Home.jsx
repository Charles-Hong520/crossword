import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '@/styles/Home.css'
const base = import.meta.env.BASE_URL;
function Home() {
    return (
        <>
            <div className='title-bar'>
                home
            </div>
             <Link to={"/upload"}>form</Link>
        </>
    )
}

export default Home
