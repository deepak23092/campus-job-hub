import React from 'react';
import Navbar from '../components/Navbar';
import Search from '../components/Search';

const StudentDashboard = () => {
    return (
        <>
            <Navbar />

            <div className="home lg:p-28 sm:p-10 p-10 pl-5 relative bg-gradient-to-r from-white to-transparent md:h-[90vh] h-[80vh] ">
                <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    className="object-cover w-full h-[80vh] md:h-[90vh] absolute top-0 left-0 -z-10"
                    alt="background"
                />
                <h4 className="highlight font-bold md:text-xl text-base text-green-700">
                    CAMPUS JOB HUB: YOUR #1 INTERNSHIP & JOB BOARD SOLUTION
                </h4>
                <h1 className="py-4 text-xl md:text-4xl font-bold md:w-[40rem]">
                    Connecting Students to Career Opportunities
                </h1>
                <h3 className="text-lg md:text-2xl font-semilight md:w-[40rem]">
                    Explore 50 lakh+ internship and job opportunities tailored for college students and recent graduates.
                </h3>

                <Search />
            </div>

        </>
    );
};

export default StudentDashboard;
