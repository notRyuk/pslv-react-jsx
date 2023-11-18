import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { Link } from 'react-router-dom';
import { createPostAsync } from './postSlice';

const PostOptions = () => {
    const tempUser = useSelector(selectLoggedInUser);
    const [postCaption, setPostCaption] = useState("");
    const [postImage, setPostImage] = useState("");
    const dispatch = useDispatch();
    const handleArticleSubmit = (e) => {
        e.preventDefault();
        const post = {
            user: tempUser,
            content : {
                text: postCaption,
                media:""
            }
        }
        dispatch(createPostAsync(post))
        console.log(postCaption);
        setPostCaption("")
    }

    const handlePhotoSubmit = (e) => {
        e.preventDefault();
        const post = {
            user: tempUser.id,
            content : {
                text: postCaption,
                media: postImage,
            }
        }
        dispatch(createPostAsync(post))
        console.log(postCaption);
        console.log(postImage);
        setPostCaption("")
        setPostImage("")
    }
    return (
        <>
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
                            {/*================================================= end ==========================================================*/}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                            <form onSubmit={handleArticleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">What's in your mind</label>
                                    <textarea className="form-control" name="caption" rows="3" value={postCaption} onChange={(e) => setPostCaption(e.target.value)}></textarea>
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