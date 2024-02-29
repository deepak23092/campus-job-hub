import JobsCard from "../components/JobsCard";
import { BiSearch } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import React, { Suspense, useContext, useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

import jobsContext from '../context/jobs/jobsContext';

import { Link } from "react-router-dom";

function Jobs() {

    const context = useContext(jobsContext);
    const { jobs, getJobs } = context;

    const [searchTerm, setSearchTerm] = useState("");
    const [searchLocation, setLocation] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getJobs();
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [getJobs]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
        <>
            <Navbar />
            <div className="Jobs flex flex-col items-center text-gray-700 bg-gray-100">
                {/* search */}
                <div className="jobs-search flex justify-start">
                    <div className="search flex justify-start">
                        <div className="hero-search my-20">
                            <div className="search-input px-10 py-3 drop-shadow-xl bg-white flex flex-col  md:flex-row justify-around items-center rounded-2xl border gap-3 relative md:w-[1040px]">
                                <input
                                    type="text"
                                    className="border-0 outline-none md:pl-4 md:w-[400px] pl-10"
                                    placeholder="Search jobs by 'skills'"
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                    }}
                                />{" "}
                                <BiSearch className="text-3xl absolute left-12 top-3 md:top-7 md:left-8 text-gray-500" />
                                <RxDividerVertical className="text-gray-100 text-4xl absolute left-[455px] hidden md:block font-light" />
                                <input
                                    type="text"
                                    className="border-0 outline-none md:pl-6 my-3 md:my-0 md:w-[140px] pl-10"
                                    placeholder="All cities 'Delhi' "
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                    }}
                                />
                                <MdOutlineLocationOn className="text-3xl absolute left-12 top-16 md:top-7 md:left-[500px] text-gray-500 " />
                                <Link onClick={scrollToTop} to="/jobs">
                                    <Suspense fallback={<Loader />}>
                                        <button className="min-w-[240px] max-w-full bg-green-700 text-white py-3 px-4 rounded-md mx-3 md:mx-0">
                                            Search jobs
                                        </button>
                                    </Suspense>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="category w-[90%] lg:w-[54%]">
                    <h2 className="text-2xl font-medium font-serif">Showing all jobs</h2>

                </div>
                {/* Job Cards */}
                <div className="jobs-cards grid grid-rows-1 grid-cols-1 md:grid-rows-2 md:grid-cols-2">
                    {loading ? (
                        <Loader />
                    ) : (
                        jobs
                            .filter((val) => {
                                // Your filtering logic here
                                if (searchTerm === "" && searchLocation === "") {
                                    return val;
                                } else if (
                                    val.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                                    val.location.toLowerCase().includes(searchLocation.toLowerCase())
                                ) {
                                    return val;
                                }
                            })
                            .map((data, id) => (
                                <Link
                                    key={id}
                                    onClick={scrollToTop}
                                    to={`/job-details/${data.id}`} // Dynamic link to job details
                                    className="job-card-link no-underline"
                                >
                                    <JobsCard
                                        FIELD1={data.id}
                                        job_title={data.title}
                                        company_name={data.company_name}
                                        Location={data.location}
                                        salery={data.salary}
                                        other_role={data.other_role}
                                    />
                                </Link>
                            ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Jobs;
