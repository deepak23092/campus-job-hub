import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const NavbarCompany = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    }

    const handleSignOut = () => {
        // Remove token from local storage
        localStorage.removeItem('token');

        // Redirect to the company signup page
        navigate('/signup/company');
    };

    return (
        <nav className="bg-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center relative left-14">
                            <img className='h-12' src={logo} alt="Campus Job Hub" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden lg:block text-lg">
                            <Link to="/company/landing" className="text-green-600 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">Home</Link>
                            <Link to="/about-company" className="text-green-600 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">About</Link>
                            <Link to="/dashboard/company" className="text-green-600 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">Post</Link>
                        </div>
                        <div className="hidden lg:block">
                            <button
                                onClick={handleSignOut}
                                className="text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md no-underline font-bold"
                            >
                                Sign Out
                            </button>
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
            <div className={`${isOpen ? 'block' : 'hidden'} absolute top-16 inset-x-0 bg-gray-700 lg:hidden transition duration-500 ease-in-out`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/company/landing" onClick={handleLinkClick} className="text-green-600 block hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">Home</Link>
                    <Link to="/about-company" onClick={handleLinkClick} className="text-green-600 block hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">About</Link>
                    <Link to="/dashboard/company" onClick={handleLinkClick} className="text-green-600 block hover:bg-green-600 hover:text-white px-3 py-2 rounded-md no-underline font-semibold">Post</Link>
                    <Link to="/signup/company" onClick={handleLinkClick} className="text-green-600 block hover:bg-red-600 hover:text-white px-3 py-2 rounded-md no-underline font-bold">Sign Out</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavbarCompany;
