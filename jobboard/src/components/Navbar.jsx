import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    }

    return (
        <nav className="bg-slate-200 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center relative left-14">
                            <img className='h-12' src={logo} alt="Campus Job Hub" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden lg:block text-lg">
                            <Link to="/student/dashboard" className="text-green-600 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">Home</Link>
                            <Link to="/about" className="text-green-600 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">About</Link>
                            <Link to="/jobs" className="text-green-600 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">Jobs</Link>
                        </div>
                        <div className="block lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-green-600 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 px-3 py-2 rounded-md"
                            >
                                <i className="fa-solid fa-bars"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} shadow-md absolute top-16 inset-x-0 bg-gray-700 lg:hidden transition duration-500 ease-in-out`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/student/dashboard" onClick={handleLinkClick} className="block hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold text-green-600">Home</Link>
                    <Link to="/about" onClick={handleLinkClick} className="text-green-600 block hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">About</Link>
                    <Link to="/jobs" onClick={handleLinkClick} className="text-green-600 block hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">Jobs</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;