import React from "react";
import companyImg from "../../assets/images/company.png"
import jobHuntImg from "../../assets/images/job-hunt.svg"

const JobContainer = ({ usermain, jobs, alumnis, csrfToken, allJobs }) => {
  return (
    <main className="job-container">
      <div
        className="continer-left"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {usermain.role === "alumni" ? (
          <div className="card">
            <h2>{jobs.length} Jobs Posted</h2>
          </div>
        ) : (
          <div
            className="card"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h3>Alumni Lists.....</h3>
            {alumnis.map((reqUser) => (
              <div className="connectSuggestion" key={reqUser.user}>
                <a href={`/profile/${reqUser.user}`}>
                  <div className="connectProfile">
                    <img src={reqUser.imageUrl} alt="personImg" />
                    <div className="connectInfo">
                      <strong>
                        {reqUser.firstname} {reqUser.lastname}
                      </strong>
                      <small>{reqUser.bio}</small>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container-main">
        {usermain.role === "alumni" ? (
          <div className="card">
            <h3 style={{ textAlign: "center" }}>Post a job</h3>
            <form action="/post-job" method="post" className="jobForm">
              <label className="jobLabel" htmlFor="job-title">
                Job Title
              </label>
              <input
                className="jobInput"
                type="text"
                id="job-title"
                name="jobtitle"
                required
              />

              <label className="jobLabel" htmlFor="company-name">
                Company Name
              </label>
              <input
                className="jobInput"
                type="text"
                id="company-name"
                name="companyname"
                required
              />

              <label className="jobLabel" htmlFor="job-description">
                Job Description
              </label>
              <textarea
                className="jobInput"
                id="job-description"
                name="jobdescription"
                required
              ></textarea>

              <label className="jobLabel" htmlFor="job-location">
                Job Location
              </label>
              <input
                className="jobInput"
                type="text"
                id="job-location"
                name="joblocation"
                required
              />

              <label className="jobLabel" htmlFor="job-type">
                Job Type
              </label>
              <select
                className="jobInput"
                id="job-type"
                name="jobtype"
                required
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
                <option value="internship">Internship</option>
              </select>

              <label className="jobLabel" htmlFor="job-salary">
                Salary
              </label>
              <input
                className="jobInput"
                type="number"
                id="job-salary"
                name="jobsalary"
                required
              />

              <label className="jobLabel" htmlFor="job-skills">
                Skills
              </label>
              <textarea
                className="jobInput"
                id="job-skills"
                name="jobskills"
                required
              ></textarea>
              <input type="hidden" name="_csrf" value={csrfToken} />
              <button
                type="submit"
                className="submitButton"
                style={{ width: "100%" }}
              >
                Post Job
              </button>
            </form>
          </div>
        ) : allJobs.length > 0 ? (
          <div className="card job-card-container">
            <div className="container-title">
              <div
                style={{ fontSize: "18px", fontWeight: 600, color: "white" }}
              >
                Recommended for you
              </div>
              <div style={{ fontSize: "13px", fontWeight: "normal" }}>
                Based on your job searches, profile and search history
              </div>
            </div>
            {allJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="company-image">
                  <img
                    src={companyImg}
                    height="50px"
                    width="50px"
                    alt="company-img"
                  />
                </div>
                <div className="company-info">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        fontSize: "18px",
                        fontWeight: 450,
                      }}
                      className="job-name"
                    >
                      {job.title} ({job.type})
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2rem",
                        fontSize: "18px",
                      }}
                    >
                      <span className="material-symbols-rounded job-icon job-visibility">
                        visibility_off
                      </span>
                      <span className="material-symbols-rounded job-icon">
                        bookmark
                      </span>
                    </div>
                  </div>
                  <div className="company-name">
                    AT{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {job.companyname}
                    </span>
                  </div>
                  <div className="company-location">
                    Location: {job.location}
                  </div>
                  <div className="posted-time">Skills: {job.skills}</div>
                  <div>Salary: {job.salary}</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: "5px",
                      gap: "4px",
                    }}
                  >
                    <span
                      className="material-symbols-rounded job-icon"
                      style={{ color: "orange", fontSize: "25px" }}
                    >
                      star
                    </span>
                    <div>Actively Hiring</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>No Jobs Available</h1>
        )}
      </div>
      <div className="container-right">
        <div className="card job-helper">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "18px", fontWeight: 600, color: "white" }}>
              Job Seeker Guidance
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              fontSize: "13px",
              color: "#cacaca",
            }}
          >
            <img
              src={jobHuntImg}
              width="80%"
              alt="job-hunt"
              style={{ paddingLeft: "10%" }}
            />
            <div>
              Looking to advance your career and land your next job opportunity?
              Our expert-led courses are designed to provide you with the tools
              and knowledge you need to take your career to the next level. Our
              courses cover a wide range of topics, including resume writing,
              interview skills, networking strategies, job searching techniques,
              and more. Whether you're just starting out in your career or
              looking to make a career change, our courses are tailored to meet
              your needs and help you achieve your goals.
            </div>
            <div>
              Our courses are led by industry experts with years of experience
              in their respective fields. They will guide you through each step
              of the process, providing practical advice and actionable tips to
              help you succeed. You'll learn how to create a winning resume that
              highlights your skills and accomplishments, craft effective cover
              letters that grab the attention of hiring managers, and develop a
              strong professional network that can help you uncover hidden job
              opportunities.
            </div>
            <div>
              In addition to our core courses, we also offer a variety of
              specialized courses to help you develop specific skills or address
              specific challenges. Whether you need help with public speaking,
              time management, or negotiation, our courses will provide you with
              the knowledge and tools you need to succeed.
            </div>
            <div>
              At the end of each course, you'll receive a certificate of
              completion that you can add to your resume and LinkedIn profile.
              This will demonstrate to employers that you are committed to your
              professional development and have invested in yourself to enhance
              your skills and knowledge.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobContainer;
