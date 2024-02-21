import React from "react";
import JobsFilter from "../../components/jobs-filter-results";

const Index = () => {
  // Demo data for jobs, alumnis, csrfToken, and allJobs
  const jobs = [
    { id: 1, title: "Software Engineer", companyname: "TechCorp", location: "Cityville", type: "Full Time", salary: "$80,000", skills: "React, Node.js" },
    // Add more job objects as needed
  ];

  const alumnis = [
    { user: "alumni1", imageUrl: "/images/alumni1.jpg", firstname: "John", lastname: "Doe", bio: "Software Developer" },
    // Add more alumni objects as needed
  ];

  const csrfToken = "your_csrf_token_here"; // Replace with your actual CSRF token

  const allJobs = [
    { id: 1, title: "Frontend Developer", companyname: "WebTech", location: "TechCity", type: "Full Time", salary: "$75,000", skills: "React, JavaScript" },
    // Add more job objects as needed
  ];

  const usermain = {
    role: "alumni", // Change to 'alumni' to see the alumni section
  };

  return <JobsFilter/>;
};

export default Index;