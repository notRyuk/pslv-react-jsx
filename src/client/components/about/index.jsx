import React from "react";
import Footer from "../footer";

const AboutUs = () => {
  return (
    <div>
      <h1
        className="card"
        style={{
          color: "white",
          width: "90%",
          margin: "0 auto",
          marginTop: "5rem",
          textAlign: "center",
          fontSize: "3rem",
        }}
      >
        About us
      </h1>
      <main className="twoColumnGrid">
        <div className="leftContent">
          <div className="card">
            <p style={{ marginBottom: "0.5rem" }}>
              Welcome to our professional mascot app, where you can connect with
              like-minded individuals, post your thoughts and ideas, and apply
              for jobs to take your career to the next level.
            </p>
            {/* Other paragraphs go here */}
            <p style={{ marginBottom: "0.5rem" }}>
              Join our professional social media app today and start building
              valuable connections, sharing your expertise, and taking your
              career to the next level. We are dedicated to helping
              professionals like you achieve your goals and succeed in your
              chosen field.
            </p>
            <p style={{marginBottom: "0.5rem"}}>
              At our app, we believe that every individual has something
              valuable to contribute to the professional world, and our platform
              is designed to help you showcase your skills, connect with
              potential employers, and grow your network.
            </p>
            <p style={{marginBottom: "0.5rem"}}>
              With our powerful search and filter tools, you can find and
              connect with individuals and companies in your industry, discover
              new job opportunities, and stay up-to-date with the latest trends
              and news in your field.
            </p>
            <p style={{marginBottom: "0.5rem"}}>
              Our user-friendly interface makes it easy to create a detailed
              profile that highlights your skills, experience, and achievements,
              and showcase your portfolio to potential employers. You can also
              share your thoughts and insights through our blog and forums,
              engage in meaningful discussions with other professionals, and
              build your reputation as a thought leader in your industry.
            </p>
            <p style={{marginBottom: "0.5rem"}}>
              Whether you're looking for your next career move or seeking to
              expand your network, our professional social media app is the
              perfect platform to help you achieve your goals. Join us today and
              take the first step towards building a successful career in your
              chosen field.
            </p>
            <p style={{marginBottom: "0.5rem"}}>
              valuable connections with other professionals by participating in
              our networking events and groups. Our platform provides a range of
              options for you to connect with others based on common interests,
              industry, or location. You can also use our messaging feature to
              connect with individuals one-on-one and build meaningful
              relationships with potential employers, mentors, or collaborators.
            </p>
            <p style={{marginBottom: "0.5rem"}}>
              Our app also provides a comprehensive job search feature that
              allows you to browse through thousands of job openings across
              various industries, and apply for positions that match your
              skillset and experience. You can also set up job alerts to stay
              updated on the latest job opportunities that match your
              preferences.
            </p>
            <p style={{marginBottom: "0.5rem"}}>
              We believe that a strong professional network is key to success,
              and our app provides you with the tools and resources you need to
              grow your network and advance your career. Our app is designed to
              be user-friendly and intuitive, making it easy for you to navigate
              and explore all the features and benefits of our platform.
            </p>
          </div>
        </div>
        <div className="rightContent">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
