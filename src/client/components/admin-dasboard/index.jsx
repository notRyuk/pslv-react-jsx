import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { fetchAllPostsAsync, selectAllPosts, selectPostListStatus } from '../posts/postSlice';
import { fetchAllUsersAsync, selectAllUsers, selectUserInfoStatus } from '../auth/user/userSlice';
import RequestedUser from '../cards/RequestedUser';
import NewsCard from '../cards/newsCard';
import "./styles.scss";
import AluminiRequestCard from '../cards/AluminiRequestCard';

const AdminDashboard = ({ role, user, connection, users, posts }) => {

    const tempUser = useSelector(selectLoggedInUser)
    console.log(tempUser);
    const status = "idle"
    const userInfoStatus = "idle"
    return (
        <>
            {role === 'admin' ? (
                <h1>ADMIN</h1>
            ) : (
                <main className="" id='mainContainer'>

                    {/* left profile container  */}

                    <div className="left-content content">
                        <div className="card">
                            <h2>Add Institute</h2>

                        </div>
                    </div>

                    {/* middle container header */}

                    <div className="card center-content content" id='center-content'>
                    <h2 className='pb-2' style={{fontWeight:"600", borderBottom:"1px solid white"}}>Student to Alumini Requests</h2>
                    <AluminiRequestCard user={tempUser}></AluminiRequestCard>
                    <AluminiRequestCard user={tempUser}></AluminiRequestCard>
                    <AluminiRequestCard user={tempUser}></AluminiRequestCard>
                    </div>
                    <div className="right-content content" id='right-content'>
                        <div className="card">
                            <h5>Mascot News</h5>
                            <NewsCard></NewsCard>
                            <div className="specialLink">
                                {/* <Link to="#">Show More</Link> */}
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default AdminDashboard;
