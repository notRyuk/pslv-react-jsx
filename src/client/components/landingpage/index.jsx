import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container custom-container">
          <div className="custom-brand">
            <Link to="#" className="navbar-brand">
              <img src="/logo/logo.png" alt="mascot" className="logoImg" />
            </Link>
            <form
              className="d-flex justify-content-center align-items-center form-inline my-2 my-lg-0 form-explore mr-auto"
              role="search"
              style={{ gap: "0.3rem" }}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="#Explore"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <button
            className="navbar-toggler togglerButton"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarOffcanvas"
            aria-controls="navbarOffcanvas"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end bg-secondary canvas-color"
            id="navbarOffcanvas"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title text-light"
                id="offcanvasNavbarLabel"
              >
                Mascot
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div
                className="navbar-nav justify-content-end flex-grow-1 pe-3"
                style={{ gap: "0.5rem" }}
              >
                <Link className="nav-item nav-link" to="/login">
                  <i className="fa-regular fa-compass"></i> Discover
                </Link>
                <Link className="nav-item nav-link" to="/login">
                  <i className="fa-solid fa-user-group"></i> People
                </Link>
                <Link className="nav-item nav-link" to="/login">
                  <i className="fa-brands fa-youtube"></i> Learning
                </Link>
                <Link className="nav-item nav-link" to="/login">
                  <i className="fa-solid fa-briefcase"></i> Jobs
                </Link>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link to="/login">
                    <button type="button" className="btn btn-info">
                      Login
                    </button>
                  </Link>
                  {/* <a href="/admin-login">
                    <button type="button" className="btn btn-light">Admin Login</button>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "70%",
          margin: "0 auto",
          marginBottom: "1rem",
          color: "white",
        }}
      >
        <div className="card landCard">
          <div style={{ width: "50%" }} className="container--main--index">
            <h1 style={{ marginBottom: "1rem" }} id="heading-text"></h1>
            Mascot is a social media platform designed for professional
            networking, job searching, and career development. Its main purpose
            is to connect professionals from all industries and provide a
            platform for them to showcase their skills, experiences, and
            accomplishments.
            <br />
            <br />
            Mascot allows users to create a profile that functions as a digital
            resume, including details such as work history, education, skills,
            and recommendations. Users can connect with other professionals in
            their field, join industry-specific groups, and follow companies
            they're interested in.
            <br />
            <br />
            Mascot also offers job search functionality, allowing users to
            search for job postings and apply for positions directly through the
            platform. Additionally, Mascot provides a variety of educational
            resources, such as courses and articles, to help users develop new
            skills and advance their careers.
            <br />
            <br />
            Overall, Mascot serves as a valuable tool for professionals to build
            their personal brand, expand their network, and find new career
            opportunities.
          </div>
          <div className="imgSide">
            <img
              src="/images/Discussion-amico.png"
              alt="randomImg"
              width="500px"
              height="500px"
            />
          </div>
        </div>
        <div className="landCard">
          <div>
            <h1>Find the right job or internship for you</h1>
          </div>
          <div>
            <h3 style={{ marginBottom: "1rem" }}>Suggested Searches</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <button className="filled-button">Engineering</button>
              <button className="filled-button">Full stack developer</button>
              <button className="filled-button">Backend developer</button>
              <button className="filled-button">Frontend developer</button>
              <button className="filled-button">Android developer</button>
              <button className="filled-button">Software Engineer</button>
              <button className="filled-button">Finance</button>
              <button className="filled-button">Business Development</button>
              <button className="filled-button">Operations</button>
              <button className="filled-button">Human Resources</button>
            </div>
          </div>
        </div>
        <div className="landCard card">
          <div>
            <h1>Post your job for millions of people to see</h1>
          </div>
          <div>
            <button className="text-button">Post a job</button>
          </div>
        </div>
        <div className="landCard">
          <div style={{ width: "70%" }}>
            <h3 style={{ marginBottom: "1rem" }}>
              Conversations today could lead to opportunity tomorrow
            </h3>
            <p>
              Sending messages to people you know is a great way to strengthen
              relationships as you take the next step in your career.
            </p>
          </div>
          <div className="imgSide">
            <img
              src="/images/Metrics-amico.png"
              alt="randomImg"
              width="300px"
              height="300px"
            />
          </div>
        </div>
        <div className="landCard">
          <div className="landHelp card">
            <div className="imgCol">
              <img
                src="/images/Helping a partner-pana.png"
                alt="randomImg"
                style={{ width: "100%" }}
              />
            </div>
            <h3>Connect with people who can help</h3>
            <button className="filled-button">Find People you know</button>
          </div>
          <div className="landHelp card">
            <div className="imgCol">
              <img
                src="/images/Working-amico.png"
                alt="randomImg"
                style={{ width: "100%" }}
              />
            </div>
            <h3>Learn the skills you need to succeed</h3>
            <button className="filled-button">Learn</button>
          </div>
        </div>
        <div className="landCard">
          <div className="landHelp">
            <h1>Who is Mascot for?</h1>
            <h2>
              Any student who wants to navigate to their professional life
            </h2>
            <div
              className="card"
              style={{ boxShadow: "4px 4px 5px 1px black", cursor: "pointer" }}
            >
              Find a coworker, colleague or classmate
            </div>
            <div
              className="card"
              style={{ boxShadow: "4px 4px 5px 1px black", cursor: "pointer" }}
            >
              Find an internship
            </div>
            <div
              className="card"
              style={{ boxShadow: "4px 4px 5px 1px black", cursor: "pointer" }}
            >
              Find a job & referrals
            </div>
          </div>
          <div className="imgSide">
            <img src="/images/Profile data-amico.png" alt="randomImg" />
          </div>
        </div>
      </main>
      <footer className="landFooter">
        <p>Mascot &copy; 2023. All rights reserved</p>
      </footer>
    </div>
  );
};

export default Landing;
