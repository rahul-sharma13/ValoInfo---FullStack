import { Input } from '@material-tailwind/react'
import React from 'react'

const ViewProfileTab = ({ user }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-32 h-32 cursor-pointer self-center shadow-md overflow-hidden rounded-full">
                <img
                    src={user?.avatar}
                    alt="user"
                    className={`rounded-full w-full h-full border-4 object-cover self-center border-blue-500`}
                />
            </div>
            <Input
                id="username"
                label="Username"
                size="lg"
                color="blue"
                className="w-[500px]"
                value={user?.username}
            />

            <Input
                id="email"
                type="email"
                label="Email"
                size="lg"
                color="blue"
                className="w-[500px]"
                value={user?.email}
            />
            <p className='flex gap-1 justify-center'>
                <span className='text-gray-600'>
                    Joined at
                </span>
                {new Date(user?.createdAt).toLocaleDateString()}
            </p>
        </div>
    )
}

export default ViewProfileTab