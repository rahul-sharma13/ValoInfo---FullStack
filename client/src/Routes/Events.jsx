import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import EventCard from '../components/EventCard';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@material-tailwind/react';

const Events = () => {
    const [requiredStatus, setRequiredStatus] = useState('Ongoing');

    const { data: events, isLoading, isError, error } = useQuery({
        "queryKey": ["events", requiredStatus],
        "queryFn": async () => {
            const res = await axios.get(`https://valo-info-api.vercel.app/api/v1/event/basedonstatus?status=${requiredStatus}`)
            return res.data.data;
        }
    })

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

            {
                isLoading && <div className='flex items-center justify-center mt-10'>
                    <Spinner/>
                </div>
            }
            {
                isError && <p>{error.message}</p>
            }
            {
                events && events.length > 0 &&
                <div className='flex flex-wrap gap-4 justify-center  mt-4'>
                    <EventCard
                        events={events}
                        reqStatus={requiredStatus}
                    />
                </div>
            }
        </div>
    )
}

export default Events