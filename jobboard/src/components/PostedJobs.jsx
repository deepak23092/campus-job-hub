import React from 'react';
import JobsCardCompany from './JobsCardCompany';

const PostedJobs = ({ postedJobs }) => {
    return (
        <div className='p-4' id='jobsPosted'>
            <h3 className='font-serif mx-4'>Jobs Posted by Your Company</h3>
            {postedJobs.map((data) => (
                <JobsCardCompany
                    key={data.id}
                    FIELD1={data.id}
                    job_title={data.title}
                    company_name={data.company_name}
                    Location={data.location}
                    salery={data.salary}
                    other_role={data.other_role}
                />
            ))}
        </div>
    );
};

export default PostedJobs;
