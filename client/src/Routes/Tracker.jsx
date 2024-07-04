import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Tracker = () => {
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const getUserDetails = async (pid) => {
        await axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/ap/${pid}`).then((res) => {
            console.log(res);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${formData?.name}/${formData?.tag}`).then((res) => {
            const pid = res?.data?.data?.puuid;

            getUserDetails(pid);
        })       
    }

    return (
        <form  onSubmit={handleSubmit}>
            <input type="text" id="name" placeholder="Enter your Riot ID" className="border-2 border-gray-300 p-2 rounded-md text-black" onChange={handleChange} />
            #
            <input type="text" id="tag" placeholder="Tag" className="border-2 border-gray-300 p-2 rounded-md text-black" onChange={handleChange} />
            <button className="bg-accent text-accent-foreground p-2 rounded-md">Submit</button>
        </form>
    )
}

export default Tracker