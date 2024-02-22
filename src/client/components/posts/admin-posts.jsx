import urls, { basePath } from "@utils/urls";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser, selectSession } from '../auth/authSlice';
import PostCard from "../posts/PostCard";
import PostOptions from '../posts/PostOptions';
import { useGetter } from "../../hooks/fetcher";
import { Typography } from "@mui/material";
import Footer from "../footer";


export default function AdminPost() {
    const { data: postData, mutate: postMutate } = useGetter(basePath + urls.posts.all)
    return (

        <Typography fontSize="1rem">
            <div className="row m-3">
                <div className="col-8">
                    <div className="container-main">
                        {postData?.data.reverse().map((eachPost) =>
                            <PostCard
                                key={eachPost._id}
                                post={eachPost}
                                postMutate={postMutate}
                                delete={true}
                            />
                        )}
                    </div>
                </div>
                <div className="col-4">
                    <Footer></Footer>
                </div>
            </div>
        </Typography>
    )
}