import profile from "@client/assets/images/profile.png";
import urls, { basePath } from "@utils/urls";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { serverPath } from "../../../utils/urls";
import { selectLoggedInUser, selectSession } from '../auth/authSlice';
import Footer from '../footer';
import Loading from "../loading";
import PostCard from "../posts/PostCard";
import PostOptions from '../posts/PostOptions';
import './styles.scss';
// import { fetchUserByIdAsync, selectUserInfo, selectUserInfoStatus } from '../auth/user/userSlice';

const HomeComponent = ({ role, user, connection, users, posts }) => {
    const [tempPosts, setTempPosts] = useState([])
    const [isPostChanged, setIsPostChanged] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const tempUser = useSelector(selectLoggedInUser);
    const session = useSelector(selectSession);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(basePath + urls.posts.all, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: `Bearer ${session.token}`
                    },
                });
                setTempPosts(res.data.data);
            } catch (error) {
                console.error("Error while fetching data:", error);
            } finally {
                // Set loading to false regardless of success or failure
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isPostChanged, session.token]);

    return (
        <>
            {isLoading ? (
                <Loading></Loading>
            ) : (
                <main className="mainContainer">

                    {/* left profile container  */}

                    <div className="left-content content">
                        <div className="card profileCard">
                            <div className="cover"></div>
                            <div className="profileInfo">
                                <img src={tempUser?.profilePhoto ? serverPath + tempUser?.profilePhoto : profile} alt="profileImg" className="profileImg" />
                                <strong className="userName">
                                    {tempUser?.name.first} {tempUser?.name.last} <span style={{ textTransform: 'capitalize' }}>({tempUser?.role})</span>
                                </strong>
                                <small className="userProfession">{tempUser?.bio || ""}</small>
                                <span>{user.institute}</span>
                            </div>
                            <div className="connection">
                                <strong>{connection}</strong>
                                <small>Connections</small>
                            </div>
                            <div className="specialLink">
                                <Link to={`/profile/${tempUser?._id}`}>My Profile</Link>
                            </div>
                        </div>

                        {/* left connect container */}

                        {/* <div className="card left-group">
                            <h5>Connect with more people.....</h5>
                            {allUsers.map((user) => {
                                if (user._id !== tempUser._id) {
                                    return <SuggestedUser key={user._id} user={user} />
                                }
                            }
                            )}
                            <div className="specialLink">
                                <Link to="/network">Show More</Link>
                            </div>
                        </div> */}
                    </div>

                    {/* middle container header */}

                    <div className="center-content content">
                        <PostOptions isPostChanged={isPostChanged} setIsPostChanged={setIsPostChanged}></PostOptions>
                        {tempPosts.reverse().map((eachPost) =>
                            <PostCard
                                key={eachPost._id}
                                post={eachPost}
                            />
                        )}
                    </div>
                    <div className="right-content content">
                        <div className="card">
                            <h5>Mascot News</h5>
                            <ul className="newsSection">
                                <li>
                                    <i className="fa-solid fa-circle"></i> Mascot announces new tools for job seekers
                                    Mascot has just released a suite of new tools to help job seekers find their next career move. Mascot hopes that these new tools will help job seekers feel more confident and empowered in their job search.
                                </li>
                                <li>
                                    <i className="fa-solid fa-circle"></i> Microsoft acquires Mascot Learning
                                    Microsoft has acquired Mascot Learning, the educational arm of the professional social media platform. With this acquisition, Microsoft hopes to expand its e-learning offerings and provide more educational resources to its users.
                                </li>
                                <li>
                                    <i className="fa-solid fa-circle"></i> Mascot releases diversity report, outlines plans for improvement
                                    In an effort to be more transparent about its diversity initiatives, Mascot has released its annual diversity report. The report outlines the company's current demographics and highlights areas where improvements need to be made.
                                </li>
                                {/* ... more news items */}
                            </ul>
                            <div className="specialLink">
                                <Link to="#">Show More</Link>
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
                </main>
            )}
        </>
    );
};

export default HomeComponent;
