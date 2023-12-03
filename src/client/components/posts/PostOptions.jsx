import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser, selectSession } from '../auth/authSlice';
import { Link } from 'react-router-dom';
import { createPostAsync } from './postSlice';
import profile from "@client/assets/images/profile.png"
import { serverPath } from '../../../utils/urls';
import { usePoster } from '@client/hooks/fetcher';
import urls, { basePath } from '@utils/urls';
import axios from 'axios';
import { TextField } from '@mui/material';

const PostOptions = ({isPostChanged, setIsPostChanged}) => {
    const tempUser = useSelector(selectLoggedInUser);
    const session = useSelector(selectSession)
    const [postCaption, setPostCaption] = useState('');
    const [postImages, setPostImages] = useState([]);
    // const [isPostChanged, setIsPostChanged] = useState(false);
    const dispatch = useDispatch();
    const { trigger: postPhoto, data: postedPhoto } = usePoster(basePath + urls.post.create)

    const handleImageChange = (e) => {
        const files = e.target.files;
        setPostImages([...postImages, ...files]);
    };

    const handlePhotoSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const res = await axios.post(basePath + urls.post.create, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${session.token}`
            },
        });
        setPostCaption('');
        setPostImages([]);
        setIsPostChanged(!isPostChanged);
    };

    const handleArticleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const res = await axios.post(basePath + urls.post.create, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${session.token}`
            },
        });
        setPostCaption('');
        setIsPostChanged(!isPostChanged);
    }
    return (
        <>
            <div className="card">
                <div className="postBox">
                    <div className="profileImgPost">
                        <img src={tempUser?.profilePhoto ? serverPath + tempUser?.profilePhoto : profile} alt="profileImg" className="profileImg" />
                    </div>
                    <input type="text" disabled placeholder="Start a post" style={{backgroundColor:'white'}}/>
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

            {/* photo modal */}
            <div className="modal fade mt-5" id="photoModal" tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add a Photo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handlePhotoSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">What's in your mind</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="content.text"
                                        value={postCaption}
                                        onChange={(e) => setPostCaption(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Image Files</label>
                                    <input type="file" className="form-control" name="content.media"
                                        autoComplete='off'
                                        onChange={handleImageChange} multiple />
                                </div>
                                <button type="submit" className="btn submitButton" data-bs-dismiss="modal" style={{ width: '100%' }}>Post</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="modal fade mt-5" id="photoModal" tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add a Photo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handlePhotoSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">What's in your mind</label>
                                    <input type="text" className="form-control" name="caption" onChange={(e) => setPostCaption(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Image URL</label>
                                    <input type="text" className="form-control" name="imageUrl" onChange={(e) => setPostImage(e.target.value)} />
                                </div>
                                <button type="submit" className="btn submitButton" data-bs-dismiss="modal" style={{ width: '100%' }}>Post</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="modal fade mt-5" id="articleModal" tabIndex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Write an Article</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/*========================================== article post api ========================================================*/}
                            <form onSubmit={handleArticleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">What's in your mind</label>
                                    <textarea className="form-control" name="content.text" rows="3" value={postCaption} onChange={(e) => setPostCaption(e.target.value)}></textarea>
                                </div>
                                <button type="submit" className="btn submitButton" data-bs-dismiss="modal" style={{ width: '100%' }}>Post</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostOptions