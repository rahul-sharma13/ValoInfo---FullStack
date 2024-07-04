import React from 'react'
import Hero from '../components/Hero'
import Agents from '../components/Agents'
import Maps from '../components/Maps'
import Events from '../components/Events'

const Home = () => {
    return (
        <div className="font-poppins">
            <Hero />
            <Agents />
            <Maps />
            <Events />
        </div>
    )
}

export default Home