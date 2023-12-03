import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { fetchAllPostsAsync, selectAllPosts, selectPostListStatus } from '../posts/postSlice';
import { fetchAllUsersAsync, selectAllUsers, selectUserInfoStatus } from '../auth/user/userSlice';
import RequestedUser from '../cards/RequestedUser';
import NewsCard from '../cards/newsCard';
import "./styles.scss";

const AdminDashboard = ({ role, user, connection, users, posts }) => {
    const dispatch = useDispatch()
    const tempUser = useSelector(selectLoggedInUser);
    const tempPosts = useSelector(selectAllPosts);
    const status = useSelector(selectPostListStatus);
    const userInfoStatus = useSelector(selectUserInfoStatus)
    const allUsers = useSelector(selectAllUsers)


    useEffect(() => {
        dispatch(fetchAllPostsAsync())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchAllUsersAsync())
    }, [dispatch])

    if (status === 'loading' || userInfoStatus === 'loading') {
        return <div>Loading...</div>;
    }
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

                    <div className="center-content content" id='center-content'>
                    <RequestedUser user={tempUser}></RequestedUser>
                    <RequestedUser user={tempUser}></RequestedUser>
                    <RequestedUser user={tempUser}></RequestedUser>
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
