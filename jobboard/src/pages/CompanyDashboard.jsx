import React, { useContext, useEffect, useState } from 'react';
import NavbarCompany from '../components/NavbarCompany';
import PostJob from '../components/PostJob';
import PostedJobs from '../components/PostedJobs';

import jobsContext from '../context/jobs/jobsContext';

const CompanyDashboard = () => {
    const context = useContext(jobsContext);
    const { getJobs, jobs, company, getLoggedInCompany } = context;
    const [postedJobs, setPostedJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getJobs();
                await getLoggedInCompany();

                // Filter jobs based on the company_id of the logged-in company
                const companyJobs = jobs.filter(job => job.company_name === company.name);

                setPostedJobs(companyJobs);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [getJobs, getLoggedInCompany, jobs, company]); // Empty dependency array for one-time rendering

    return (
        <div className='bg-slate-200'>
            <NavbarCompany />
            <div className="container">
                <PostJob />

                {/* Use the PostedJobs component to display posted jobs */}
                <PostedJobs postedJobs={postedJobs} />
            </div>
        </div>
    );
};

export default CompanyDashboard;
