import JobsContext from './jobsContext';
import { useState, useEffect } from 'react';

const JobsState = (props) => {

    let host = "https://campus-jobhub.vercel.app";

    const jobsInitial = [];
    const [jobs, setJobs] = useState(jobsInitial);

    const [company, setCompany] = useState([]);

    // Function to get authToken from local storage
    const getAuthToken = () => {
        return localStorage.getItem('token');
    };

    // Function to get the logged-in company details
    const getLoggedInCompany = async () => {

        const authToken = getAuthToken(); // Retrieve the authToken

        try {
            // Replace the logic to fetch company details from your storage or API
            const response = await fetch(`${host}/company/getLoggedInCompany`, {
                method: "GET",
                headers: {
                    "auth-Token": authToken, // Include the authToken in headers
                },
                credentials: 'include'
            });

            if (response.ok) {
                const companyData = await response.json();
                setCompany(companyData);
            } else {
                console.error("Failed to get company:", response.status);
            }
        } catch (error) {
            console.error("Error fetching company:", error);
        }
    };

    // Function to post job details
    const postJobs = async (title, location, salary, other_role) => {

        const authToken = getAuthToken(); // Retrieve the authToken

        try {
            const response = await fetch(`${host}/jobs/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'auth-Token': authToken, // Include the authToken in headers
                },
                credentials: 'include',
                body: JSON.stringify({ title, location, salary, other_role })
            });

            if (response.ok) {
                const job = await response.json();
                setJobs([...jobs, job]);
            } else {
                console.error("Failed to post job:", response.status);
            }
        } catch (error) {
            console.error("Error posting job:", error);
        }
    };

    // Function to get job details
    const getJobs = async (term, location) => {
        try {
            let url = `${host}/jobs/get`;

            // Append search parameters to the URL if provided
            if (term) {
                url += `?term=${term}`;
            }
            if (location) {
                url += `${term ? '&' : '?'}location=${location}`;
            }

            const response = await fetch(url, {
                method: "GET",
                credentials: 'include'
            });

            if (response.ok) {
                const json = await response.json();
                setJobs(json);
            } else {
                console.error("Failed to get jobs:", response.status);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    // Function to delete job
    const deleteJob = async (id) => {
        const authToken = getAuthToken();

        try {
            const response = await fetch(`${host}/jobs/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'auth-Token': authToken,
                },
                credentials: 'include'
            });

            if (response.ok) {
                // Update the local state by removing the deleted job
                setJobs(jobs.filter(job => job.id !== id));
            } else {
                console.error("Failed to delete job:", response.status);
            }
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    // useEffect to fetch the logged-in company details on component mount
    useEffect(() => {
        getLoggedInCompany();
    }, []);

    return (
        <div>
            <JobsContext.Provider value={{ jobs, getJobs, postJobs, company, getLoggedInCompany, deleteJob }}>
                {props.children}
            </JobsContext.Provider>
        </div>
    )
}

export default JobsState;
