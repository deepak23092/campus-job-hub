import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import loginSignupContext from '../context/loginSignup/loginSignupContext';

const Signup = ({ userType }) => {
    const navigate = useNavigate();
    const context = useContext(loginSignupContext);
    const { signupDetails } = context;

    // Validation Schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Company Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        description: Yup.string().required('Description is required'),
        website: Yup.string().required('Website is required'),
    });

    // Formik hook
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            description: '',
            website: '',
            userType: userType || '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await signupDetails(
                    values.name,
                    values.email,
                    values.password,
                    values.confirmPassword,
                    values.description,
                    values.website
                );

                // Redirect to the company dashboard after successful signup
                navigate('/company/landing');
            } catch (error) {
                // Handle errors if necessary
                console.error('Signup failed:', error);
            }
        },
    });

    // Define handleLoginClick function
    const handleLoginClick = () => {
        navigate('/login/company');
    };

    return (
        <div className="flex w-screen justify-center pb-1 items-center bg-gray-100 bg-cover">
            <form className="m-4 bg-inherit md:w-1/2 h-4/5 px-5 py-3 rounded-lg text-black bg-white border shadow-md" onSubmit={formik.handleSubmit}>
                <h1 className="text-center text-2xl font-bold">Signup</h1>
                <hr className="h-1 text-black" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Company Name */}
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">
                            Company Name*
                        </label>
                        <input
                            type="text"
                            className={`form-control ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">
                            Email address*
                        </label>
                        <input
                            type="email"
                            className={`form-control bg-transparent ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">
                            Password*
                        </label>
                        <input
                            type="password"
                            className={`form-control bg-transparent ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password*
                        </label>
                        <input
                            type="password"
                            className={`form-control bg-transparent ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
                                }`}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-2">
                    <label htmlFor="description" className="form-label">
                        Description*
                    </label>
                    <textarea
                        type="text"
                        className={`form-control bg-transparent ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''
                            }`}
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
                    )}
                </div>

                {/* Website */}
                <div className="mb-2">
                    <label htmlFor="website" className="form-label">
                        Website*
                    </label>
                    <input
                        type="text"
                        className={`form-control bg-transparent ${formik.touched.website && formik.errors.website ? 'border-red-500' : ''}`}
                        id="website"
                        name="website"
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.website && formik.errors.website && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.website}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                    <button type="submit" className="border h-10 w-20 rounded-md hover:bg-green-700 bg-green-600 text-white font-semibold">
                        Submit
                    </button>
                </div>

                {/* Log In Link */}
                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login/company" className="cursor-pointer underline" onClick={handleLoginClick}>
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
