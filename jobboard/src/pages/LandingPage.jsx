import React from 'react';
import { useNavigate } from 'react-router-dom';
import landingImage from '../assets/landing_hero.webp';

const Landing = () => {
    const Navigate = useNavigate();

    return (
        <>
            <div className="bg-gray-100 text-white h-screen flex flex-col justify-center items-center">
                <div className="text-center -mt-10">
                    <p className="text-4xl font-serif text-black ">Campus Job Hub</p>
                    <p className='text-2xl text-slate-600'>Where talent meets opportunity!</p>
                </div>
                <img src={landingImage} alt="WorkIndia Job Portal" className="md:w-[40vw] mb-3" />

                <div className="relative">
                    <button onClick={() => Navigate('/signup/company')} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none no-underline md:w-48 mr-10">Hire Now</button>
                    <button onClick={() => Navigate('/student/dashboard')} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none no-underline md:w-48 ml-10">Get A Job</button>
                </div>
            </div >
        </>
    );
};

export default Landing;