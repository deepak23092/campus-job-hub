import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ApplyForm = () => {
    const navigate = useNavigate();

    // Validation Schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Full Name is required'),
        mobile: Yup.string().required('Mobile No. is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        resume: Yup.mixed().required('Resume is required'),
        coverLetter: Yup.string(),
    });

    // Formik hook
    const formik = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            email: '',
            resume: '',
            coverLetter: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Add your logic to handle the form submission (e.g., API request to submit application)

            // For now, just log the form data
            console.log('Form Data:', values);

            // Redirect to the applied page after successful submission
            navigate('/applied');
        },
    });

    return (
        <div className="flex w-screen justify-center pb-1 items-center bg-gray-100 bg-cover">
            <form className="m-4 bg-inherit md:w-3/4 h-full px-5 py-3 rounded-lg text-black bg-white border shadow-md" onSubmit={formik.handleSubmit}>
                <h1 className="text-center text-2xl font-semibold">Apply for the Job</h1>
                <hr className="h-1 text-black" />

                <div className='flex flex-wrap justify-between'>
                    {/* Name */}
                    <div className="mb-3 w-2/5">
                        <label htmlFor="name" className="form-label">Full Name*</label>
                        <input
                            type="text"
                            className={`form-control bg-transparent ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Mobile No. */}
                    <div className="mb-3 w-2/5">
                        <label htmlFor="mobile" className="form-label">Mobile No.*</label>
                        <input
                            type="number"
                            className={`form-control bg-transparent ${formik.touched.mobile && formik.errors.mobile ? 'border-red-500' : ''}`}
                            id="mobile"
                            name="mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.mobile && formik.errors.mobile && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email*</label>
                    <input
                        type="email"
                        className={`form-control bg-transparent ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    )}
                </div>

                {/* Resume */}
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume (Upload)*</label>
                    <input
                        type="file"
                        className={`form-control bg-transparent ${formik.touched.resume && formik.errors.resume ? 'border-red-500' : ''}`}
                        id="resume"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={(event) => formik.setFieldValue("resume", event.currentTarget.files[0])}
                    />
                    {formik.touched.resume && formik.errors.resume && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.resume}</p>
                    )}
                </div>

                {/* Cover Letter */}
                <div className="mb-6">
                    <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
                    <textarea
                        className={`form-control bg-transparent ${formik.touched.coverLetter && formik.errors.coverLetter ? 'border-red-500' : ''}`}
                        id="coverLetter"
                        name="coverLetter"
                        value={formik.values.coverLetter}
                        onChange={formik.handleChange}
                        rows="4"
                    ></textarea>
                    {formik.touched.coverLetter && formik.errors.coverLetter && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.coverLetter}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                    <button type="submit" className="border h-10 w-20 rounded-md hover:bg-green-700 bg-green-600 text-white font-semibold">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ApplyForm;
