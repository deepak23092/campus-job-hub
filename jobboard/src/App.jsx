import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import JobsState from './context/jobs/JobsState'
import LoginSignupState from './context/loginSignup/LoginSignupState';
import Signup from './components/Signup';
import Login from './components/Login';
import StudentDashboard from './pages/StudentDashboard';
import Loader from "./components/Loader";
import CompanyDashboard from "./pages/CompanyDashboard";
import JobDetails from "./components/JobDetails";
import About from "./pages/About";
import Landing from "./pages/LandingPage";
import AboutCompany from "./pages/AboutCompany";
import CompanyLanding from "./pages/CompanyLanding";
import ApplyForm from "./pages/ApplyForm";
import Applied from "./pages/Applied";

const Jobs = React.lazy(() => import("./pages/Jobs"));

const App = () => {
  return (
    <JobsState>
      <LoginSignupState>

        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login/company" element={<Login />} />
            <Route exact path="/signup/company" element={<Signup userType="company" />} />
            <Route exact path="/student/dashboard" element={<StudentDashboard />} />
            <Route exact path="/jobs" element={<Suspense fallback={<Loader />}><Jobs />   </Suspense>} />
            <Route exact path="/dashboard/company" element={<CompanyDashboard />} />
            <Route exact path="/job-details/:FIELD1" element={<JobDetails />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/about-company" element={<AboutCompany />} />
            <Route exact path="/company/landing" element={<CompanyLanding />} />
            <Route exact path="/apply" element={<ApplyForm />} />
            <Route exact path="applied" element={<Applied />} />
          </Routes>
        </Router>

      </LoginSignupState>
    </JobsState>
  )
}

export default App;
