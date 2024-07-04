import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LuMoonStar, LuSun } from 'react-icons/lu';

const ThemeToggle = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div className='p-2' >
            {theme === 'dark' ? (
                <div className=' cursor-pointer flex items-center' onClick={()=>setTheme(theme === 'dark'?'light':'dark')} > <LuSun className=' text-primary text-2xl mr-2' />  </div>
            ) : (<div className=' cursor-pointer  items-center' onClick={()=>setTheme(theme === 'dark'?'light':'dark')} > <LuMoonStar className=' text-primary text-2xl mr-2' />  </div>)}
        </div>
    )
}

export default ThemeToggle