import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import Footer from '../footer';
import PostCard from '../posts/PostCard';
import PostOptions from '../posts/PostOptions';
import { fetchAllPostsAsync, selectAllPosts, selectPostListStatus } from '../posts/postSlice';
// import { fetchUserByIdAsync, selectUserInfo, selectUserInfoStatus } from '../auth/user/userSlice';

const HomeComponent = ({ role, user, connection, users, posts }) => {
    // const [tempPosts,setTempPosts] = useState([])
    const dispatch = useDispatch()
    const tempUser = useSelector(selectLoggedInUser);
    const tempPosts = useSelector(selectAllPosts);
    const status = useSelector(selectPostListStatus);


    useEffect(() => {
        // console.log(tempPosts);
        dispatch(fetchAllPostsAsync())
    }, [dispatch])
    if (status === 'loading') {
        // Handle loading state, e.g., show a loading spinner
        return <div>Loading...</div>;
    }
    return (
        <>
            {role === 'admin' ? (
                <h1>ADMIN</h1>
            ) : (
                <main className="mainContainer">

                    {/* left profile container  */}

                    <div className="left-content content">
                        <div className="card profileCard">
                            <div className="cover"></div>
                            <div className="profileInfo">
                                <img src={tempUser.details.profileImageUrl} alt="profileImg" className="profileImg" />
                                <strong className="userName">
                                    {tempUser.details.firstName} {tempUser.details.lastName} <span style={{ textTransform: 'capitalize' }}>({tempUser.role})</span>
                                </strong>
                                <small className="userProfession">{tempUser.details.userBio}</small>
                                <span>{user.institute}</span>
                            </div>
                            <div className="connection">
                                <strong>{connection}</strong>
                                <small>Connections</small>
                            </div>
                            <div className="specialLink">
                                <Link to="/profile">My Profile</Link>
                            </div>
                        </div>

                        {/* left connect container */}

                        <div className="card left-group">
                            <h5>Connect with more people.....</h5>
                            {users.map((reqUser) => (


                                // ===================================================make the api hit for connecting with people========================================================
                                <form action="/api/connection/create" method="post" key={reqUser.user}>
                                    <div className="connectSuggestion">
                                        <Link to={`/profile/${reqUser.user}`}>
                                            <div className="connectProfile">
                                                <img src={reqUser.imageUrl} alt="personImg" />
                                                <div className="connectInfo">
                                                    <strong>{reqUser.firstname} {reqUser.lastname}</strong>
                                                    <small>{reqUser.bio}</small>
                                                </div>
                                            </div>
                                        </Link>
                                        <input type="hidden" name="from" value={user.user} />
                                        <input type="hidden" name="to" value={reqUser.user} />
                                        <input type="hidden" name="type" value="MUTUAL" />
                                        <button type="submit">Connect</button>
                                    </div>
                                </form>
                                // ================================================================= end =================================================================================
                            ))}
                            <div className="specialLink">
                                <Link to="/network">Show More</Link>
                            </div>
                        </div>
                    </div>

                    {/* middle container header */}

                    <div className="center-content content">
                        <PostOptions></PostOptions>
                        {tempPosts.map((eachPost) => 
                            <PostCard
                            key={eachPost.id}
                            post={eachPost}
                        />
                        )}
                        {console.log(tempPosts)}
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
