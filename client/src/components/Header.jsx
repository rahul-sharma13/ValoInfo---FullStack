import React, { useContext, useState } from 'react';
import { navLinks } from '../constants';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import logo from '../../public/logos/logo1.png';
import logo2 from '../../public/logos/logo2.png';

const Header = () => {
  const [nav, setNav] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleClick = () => {
    setNav((prevValue) => !prevValue)
  };

  const hideTab = () => {
    setNav(false);
  };

  // for mobile menu 
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  }

  const { theme } = useContext(ThemeContext);

  return (
    <nav>
      <div className="max-w-screen-xl flex font-poppins flex-wrap items-center justify-between mx-auto p-4">
        {/* left */}
        <div>
          <a href="/" className="flex items-center">
            {theme === "dark" ? (<img src={logo2} className="h-9 mr-1" alt="ValoInfo" />) : (<img src={logo} className="h-9 mr-1" alt="ValoInfo" />)}
            <span className="self-center text-2xl tracking-wide font-bold whitespace-nowrap">
              ValoInfo
            </span>
          </a>
        </div>

        {/* right */}
        <div className="flex items-center gap-6">
          <div>
            <ul className="list-none md:flex hidden flex-1">
              {navLinks.map((nav, index) => (
                <li
                  key={index}
                  className={`font-normal cursor-pointer font-poppins text-[16px] mr-8 ${index === navLinks.length - 1 ? "mr-0" : "mr-6"}`}
                >
                  <Link to={`/${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* for avatar and signin*/}
          <div>
            {
              currentUser ? 
              (<Link to={"/account"}>
                <img src={currentUser?.avatar} alt="avatar" className="w-10 h-10 rounded-full cursor-pointer" />
              </Link>)
              : 
              <Link to='/signin'>Sign In</Link>
            }
          </div>
          <ThemeToggle />

          {/* mobile menu */}
          <div onClick={handleMenu} className='block md:hidden'>
            {menu ? (<AiOutlineClose size={25} />) : (<AiOutlineMenu size={25} />)}
            <div className={menu ? 'md:hidden fixed left-0 top-20 flex flex-col justify-between w-full h-[90%] bg-accent ease-in duration-300 z-10' : 'fixed left-[-100%] top-20 flex flex-col justify-between w-full h-[90%] bg-accent ease-in duration-300 z-10'}>
              <ul className='w-full p-4'>
                <li className='border-b border-cyan-950 py-6'>
                  <Link onClick={handleMenu} to='/'>Home</Link>
                </li>
                <li className='border-b border-cyan-950 py-6'>
                  <Link onClick={handleMenu} to='/account'>Account</Link>  {/* protected route */}
                </li>
              </ul>
              <div className='flex flex-col w-full p-4'>
                <Link to='/signin'>
                  <button className='w-full my-2 p-3 bg-accent text-accent-foreground border shadow-xl rounded-2xl'>Sign In</button>
                </Link>
                <Link to='/signup'>
                  <button className='w-full my-2 p-3 bg-accent text-accent-foreground rounded-2xl shadow-xl'>Sign Up</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav >
  );
}
export default Header
