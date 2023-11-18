import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import Footer from '../footer';
import PostCard from '../cards/PostCard';

const HomeComponent = ({ role, user, connection, users, posts }) => {
    const tempUser = useSelector(selectLoggedInUser);
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
                        <div className="card">
                            <div className="postBox">
                                <div className="profileImgPost">
                                    <img src={tempUser.details.profileImageUrl} alt="profileImg" />
                                </div>
                                <input type="text" placeholder="Start a post" />
                            </div>
                            <div className="buttonBox">
                                <div className="specialLink">
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#photoModal"><i className="fa-regular fa-image"></i> Photo</Link>
                                </div>
                                <div className="specialLink">
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-brands fa-youtube"></i> Video</Link>
                                </div>
                                <div className="specialLink">
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-regular fa-calendar-days"></i> Event</Link>
                                </div>
                                <div className="specialLink">
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#articleModal"><i className="fa-regular fa-newspaper"></i> Write an article</Link>
                                </div>
                            </div>
                        </div>

                                                                                            {/* middle container posts */}

                        <PostCard></PostCard>
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
                        {/* photo modal */}
                        <div className="modal fade mt-5" id="photoModal" tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add a Photo</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/*=========================================== photo post api ====================================================== */}
                                        <form action="/post" method="post">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">What's in your mind</label>
                                                <input type="text" className="form-control" name="caption" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Image URL</label>
                                                <input type="text" className="form-control" name="imageUrl" />
                                            </div>
                                            <button type="submit" className="btn submitButton" style={{ width: '100%' }}>Post</button>
                                        </form>
                                        {/*================================================= end ==========================================================*/}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade mt-5" id="articleModal" tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Write an Article</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/*========================================== article post api ========================================================*/}
                                        <form action="/post" method="post">
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">What's in your mind</label>
                                                <textarea className="form-control" name="caption" rows="3"></textarea>
                                            </div>
                                            <button type="submit" className="btn submitButton" style={{ width: '100%' }}>Post</button>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default HomeComponent;
