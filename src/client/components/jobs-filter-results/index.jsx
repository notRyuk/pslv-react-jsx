import React from 'react';
import Footer from '../footer';
import { useParams } from 'react-router-dom';
import { basePath, serverPath } from '../../../utils/urls';
import urls from '../../../utils/urls';
import { useGetter } from '../../hooks/fetcher';
import tempImage from "@client/assets/images/profile.png";
import { Chip, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function JobsFilter() {
    const params = useParams();
    console.log(params.title)
    const { data: filterResults, mutate: filterMutate } = useGetter(basePath + urls.job.searchByTitle.replace(":title", params.title))

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return (
        <>

            <div className="profileContainer" style={{ marginTop: "2rem", padding: "3%"}}>
                <div className="container-main">
                <div className="p-4" style={{ backgroundColor: "#1b2730", borderRadius: "10px" }}>
                    <h3 className=' ms-2'>Filtered Results</h3>
                    <hr style={{marginTop:"0.5rem"}}/>
                    {/* <hr /> */}
                    <div className="job-cards-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        {filterResults?.data.length ? filterResults?.data?.map((job) => (
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
                                        At{" "}
                                        <span style={{ fontWeight: "bold" }}>
                                            {job.company.name}
                                        </span>
                                    </div>
                                    <div>Skills Required : {job?.skills.map((eachSkill, i) => <Chip variant="outlined" key={i} label={eachSkill?.name} />)}</div>
                                    <div className="posted-time">Experience Years: {job.experienceYears}</div>
                                    <div className="posted-time">Apply Before: {formatDate(job.endsAt)}</div>
                                    {
                                        <IconButton sx={{ position: "absolute", bottom: "0.5rem", right: "1rem" }} color="primary" aria-label="add to shopping cart" onClick={() => {navigate(`/chat?userId=${job?.from?._id}`)}}>
                                            <SendIcon sx={{ color: "#3297d1", fontSize: "2rem" }} />
                                        </IconButton>
                                    }
                                </div>
                            </div>
                        )) : <h1>No Jobs found</h1>}
                    </div>
                </div>
                </div>
                <div className="container-right content">
                        <Footer></Footer>
                    </div>
            </div>
        </>
    );
}
