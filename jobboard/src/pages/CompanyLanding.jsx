import React from 'react'
import NavbarCompany from '../components/NavbarCompany';
import companyImg from '../assets/companyImg.png';
import { useNavigate } from 'react-router-dom';

const CompanyLanding = () => {
    const Navigate = useNavigate();
    return (
        <>
            <NavbarCompany />

            <div className='h-[36.2rem] bg-blue-950 text-white flex md:flex-row flex-col justify-evenly items-center px-20'>
                <div className='text-center md:text-left'>
                    <span className='font-semibold md:text-3xl text-2xl'>Campus Job Hub</span>
                    <h4 className='md:text-5xl md:mt-8 mt-4 font-semibold text-3xl'>Connect with Top Talent for Internships and Jobs</h4>
                    <button onClick={() => Navigate('/dashboard/company')} className='text-lg rounded-md px-3 py-2.5 font-semibold bg-blue-500 md:mt-8 mt-4 hover:bg-blue-600'>Post a Job</button>
                    <p className='text-sm font-semibold mt-8'>*Campus Job Hub, Total Opportunities, February 2024</p>
                </div>
                <div className='-mt-6 md:mt-0'>
                    <img src={companyImg} alt="Company" className='w-[60rem]' />
                </div>
            </div>
        </>
    )
}

export default CompanyLanding;
