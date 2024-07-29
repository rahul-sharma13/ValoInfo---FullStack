import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../components/ui/select';
import EventCard from '../components/EventCard';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [requiredStatus, setRequiredStatus] = useState('Ongoing');

    useEffect(() => {
        const getEvents = async () => {
            try {
                await axios.get(`https://valo-info-api.vercel.app/api/v1/event/basedonstatus?status=${requiredStatus}`).then((res) => {
                    console.log(res);
                    setEvents(res.data.data);
                }).catch((err) => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }

        getEvents();
    }, [requiredStatus])

    const handleStatusChange = (value) => {
        setRequiredStatus(value);
    }

    return (
        <div className='max-w-7xl mx-auto mt-8'>
            <div className='flex items-center justify-center'>
                <Select onValueChange={handleStatusChange}>
                    <SelectTrigger className='w-[140px]'>
                        <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value='Ongoing'>Ongoing</SelectItem>
                            <SelectItem value='Upcoming'>Upcoming</SelectItem>
                            <SelectItem value='Completed'>Completed</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex flex-wrap gap-4 justify-center  mt-4'>
                <EventCard
                    events={events}
                    reqStatus={requiredStatus}
                />
            </div>
        </div>
    )
}

export default Events