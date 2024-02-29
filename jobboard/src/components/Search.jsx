import React, { useState, useContext, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

import jobsContext from '../context/jobs/jobsContext';

function Search() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchLocation, setLocation] = useState("");

    const context = useContext(jobsContext);
    const { jobs, getJobs } = context;

    const handleSearch = () => {
        // Redirect to the "/jobs" page with search parameters
        navigate(`/jobs`);
    };

    return (
        <div className="search flex justify-start">
            <div className="hero-search my-14 md:ml-0 ml-2">
                <div className="search-input md:px-10 px-3 py-3 drop-shadow-xl bg-white flex flex-col md:flex-row justify-around items-center rounded-2xl border gap-3 relative md:w-[1040px]">
                    <input
                        type="text"
                        className="border-0 outline-none md:pl-7 md:w-[400px] pl-16"
                        placeholder="Search jobs by 'skills'"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <BiSearch className="text-3xl absolute left-12 top-3 md:top-7 md:left-8 text-gray-500" />
                    <RxDividerVertical className="text-gray-100 text-4xl absolute left-[455px] hidden md:block font-light" />
                    <input
                        type="text"
                        className="border-0 outline-none md:pl-6 my-3 md:my-0 md:w-[140px] pl-16"
                        placeholder="All cities 'Delhi' "
                        value={searchLocation}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <MdOutlineLocationOn className="text-3xl absolute left-12 top-16 md:top-7 md:left-[500px] text-gray-500 " />
                    <button
                        onClick={handleSearch}
                        className="min-w-[240px] max-w-full bg-green-700 text-white py-3 px-4 rounded-md mx-3 md:mx-0"
                    >
                        Search jobs
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;
