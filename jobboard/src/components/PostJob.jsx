import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import jobsContext from '../context/jobs/jobsContext';

function PostJob() {
    const context = useContext(jobsContext);
    const { postJobs } = context;

    const validationSchema = Yup.object({
        title: Yup.string().required('Job Title is required'),
        location: Yup.string().required('Location is required'),
        salary: Yup.string().required('Salary is required'),
        other_role: Yup.string().required('Other Role Details are required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            location: '',
            salary: '',
            other_role: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await postJobs(
                    values.title,
                    values.location,
                    values.salary,
                    values.other_role
                );

                // Clear the form after successful submission
                formik.resetForm();

                // Scroll to the bottom of the page
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                });
            } catch (error) {
                console.error('Error posting job:', error);
            }
        },
    });

    return (
        <div className='h-[83vh] bg-white m-4 px-4' id='postJob'>
            <h2 className='py-3 font-serif'>Post a new Job</h2>

            {/* Form to post a new job */}
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formJobTitle">
                    <Form.Label className='font-semibold'>Job Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label className='font-semibold'>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.location && formik.errors.location && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSalary">
                    <Form.Label className='font-semibold'>Salary</Form.Label>
                    <Form.Control
                        type="text"
                        name="salary"
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.salary && formik.errors.salary && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.salary}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formOtherRole">
                    <Form.Label className='font-semibold'>Other Role Details</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="other_role"
                        value={formik.values.other_role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.other_role && formik.errors.other_role && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.other_role}</p>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Post Job
                </Button>
            </Form>
        </div>
    );
}

export default PostJob;
