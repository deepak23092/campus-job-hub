import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import loginSignupContext from '../context/loginSignup/loginSignupContext';

const Login = () => {
    const navigate = useNavigate();
    const context = useContext(loginSignupContext);
    const { loginDetails } = context;

    const [error, setError] = useState(null);

    // Validation Schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    // Formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await loginDetails(values.email, values.password);
                // Redirect to the company dashboard after successful login
                navigate('/company/landing');
            } catch (error) {
                // Handle errors if necessary
                console.error('Login failed:', error);
                setError('Invalid email or password');
                return; // Don't proceed to the next page
            }
        },
    });

    return (
        <div className="flex h-screen w-screen justify-center items-center bg-gray-100 bg-cover">
            <form className="bg-inherit md:w-2/5 p-5 rounded-lg border bg-white shadow-md" onSubmit={formik.handleSubmit}>
                <h1 className="text-center font-semibold">Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <hr className="h-1" />

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address*</label>
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
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password*</label>
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

                <div className="flex justify-center mt-4">
                    <button type="submit" className="border h-10 w-20 rounded-md hover:bg-green-700 bg-green-600 text-white font-semibold">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
