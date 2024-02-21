import React from 'react';
import Footer from '../footer';

export default function JobsFilter({ style }) {
    // Sample data for demonstration
    const filterResults = [
        {
            _id: 1,
            from: {
                profilePhoto: 'profile1.jpg',
                name: { first: 'John', last: 'Doe' },
                bio: 'Front-end Developer',
            },
            title: 'Front-end Developer',
            description: 'Exciting front-end development position',
            company: { name: 'TechCo' },
            experienceYears: 3,
            endsAt: '2024-03-01',
        },
        {
            _id: 1,
            from: {
                profilePhoto: 'profile1.jpg',
                name: { first: 'John', last: 'Doe' },
                bio: 'Front-end Developer',
            },
            title: 'Front-end Developer',
            description: 'Exciting front-end development position',
            company: { name: 'TechCo' },
            experienceYears: 3,
            endsAt: '2024-03-01',
        },
        {
            _id: 1,
            from: {
                profilePhoto: 'profile1.jpg',
                name: { first: 'John', last: 'Doe' },
                bio: 'Front-end Developer',
            },
            title: 'Front-end Developer',
            description: 'Exciting front-end development position',
            company: { name: 'TechCo' },
            experienceYears: 3,
            endsAt: '2024-03-01',
        },
        {
            _id: 1,
            from: {
                profilePhoto: 'profile1.jpg',
                name: { first: 'John', last: 'Doe' },
                bio: 'Front-end Developer',
            },
            title: 'Front-end Developer',
            description: 'Exciting front-end development position',
            company: { name: 'TechCo' },
            experienceYears: 3,
            endsAt: '2024-03-01',
        },
        {
            _id: 1,
            from: {
                profilePhoto: 'profile1.jpg',
                name: { first: 'John', last: 'Doe' },
                bio: 'Front-end Developer',
            },
            title: 'Front-end Developer',
            description: 'Exciting front-end development position',
            company: { name: 'TechCo' },
            experienceYears: 3,
            endsAt: '2024-03-01',
        },
        {
            _id: 1,
            from: {
                profilePhoto: 'profile1.jpg',
                name: { first: 'John', last: 'Doe' },
                bio: 'Front-end Developer',
            },
            title: 'Front-end Developer',
            description: 'Exciting front-end development position',
            company: { name: 'TechCo' },
            experienceYears: 3,
            endsAt: '2024-03-01',
        }
        
    ];

    return (
        <>

            <div className="row" style={{marginTop: "1.5rem", padding: "3%" }}>
                <div className="col-9 p-4" style={{backgroundColor:"#1b2730", borderRadius:"10px"}}>
                    <h3 className=' ms-2'>Filtered Results</h3>
                    <hr />
                    <hr />
                    <div className="job-cards-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(30%, 1fr))", gap: "20px" }}>
                        {filterResults?.map((job) => (
                            <div className="card m-2" key={job._id} style={{ boxShadow: "1px 1px 20px 0px black" }}>
                                <div className="userProfile">
                                    <div className="profileImgPost">
                                        <img src={job?.from?.profilePhoto ? serverPath + job.from.profilePhoto : tempImage} alt="profileImg" />
                                    </div>
                                    <div className="userInfo">
                                        <h5>{job.from.name.first} {job.from.name.last}</h5>
                                        <p>{job.from.bio}</p>
                                    </div>
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
                                            {job.title} ({job.description})
                                        </div>
                                    </div>
                                    <div className="company-name">
                                        AT{" "}
                                        <span style={{ fontWeight: "bold" }}>
                                            {job.company.name}
                                        </span>
                                    </div>
                                    <div className="posted-time">Experience Years: {job.experienceYears}</div>
                                    <div className="posted-time">Apply Before: {formatDate(job.endsAt)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-3"><Footer /></div>
            </div>
        </>
    );
}

// Function to format date (you may need to implement this)
function formatDate(date) {
    // Implement date formatting logic as needed
    return date;
}

// Assuming serverPath and tempImage are defined somewhere in your code
const serverPath = 'https://example.com/';
const tempImage = 'temp-image.jpg';