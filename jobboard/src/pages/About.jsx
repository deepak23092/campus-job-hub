import React from 'react';
import Navbar from '../components/Navbar'
import aboutPic from '../assets/aboutPic.png';

const About = () => {
    return (
        <>
            <Navbar />

            <div className="">
                <div className="bg-cover bg-center h-80 bg-no-repeat flex items-center" style={{ backgroundImage: `url('${aboutPic}')` }}>
                    <h1 className='text-white text-center md:text-4xl mx-20 font-semibold'>"Connecting future leaders with exciting opportunities. Your path to success starts here!"</h1>
                </div>

                <div className='bg-blue-950 md:h-[16.2rem] h-96 text-white flex flex-col justify-center text-center'>
                    <h4 className='font-semibold md:text-4xl'>About Campus Job Hub</h4>
                    <p className='md:text-xl mt-4 md:mx-auto mx-4'>Campus Job Hub is your premier internship and job portal designed exclusively for college students and recent graduates. Dive into a world of tailored opportunities, receive expert guidance, and access invaluable resources to pave your way to success.</p>
                </div>
            </div>
        </>
    );
}

export default About;
