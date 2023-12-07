import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import urls, { basePath } from '../../../utils/urls';
import { useGetter } from '../../hooks/fetcher';
import { selectSession } from '../auth/authSlice';


const EditNewsModal = ({ show, handleClose, newsData, session }) => {
    const [editedTitle, setEditedTitle] = useState(newsData.title);
    const [editedDescription, setEditedDescription] = useState(newsData.description);
    const newsUpdateUrl = basePath + urls.news.update.replace(':id', newsData._id)
    const newsDeleteUrl = basePath + urls.news.delete.replace(':id', newsData._id)
    const handleSaveChanges = async () => {
        const res = await axios.put(newsUpdateUrl, {
            "title": editedTitle,
            "description": editedDescription
        }, {
            headers: {
                authorization: `Bearer ${session.token}`
            }
        })
        if (res?.data) {
            handleClose();
        }
    };

    const handleDelete = async () => {
        const res = await axios.delete(newsDeleteUrl, {
            headers: {
                authorization: `Bearer ${session.token}`
            }
        })
        if (res?.data) {
            handleClose();
        }
    }

    return (
        <div className={`modal mt-5 ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" style={{ color: 'black' }}>
                            Edit News
                        </h5>
                        <button type="button" className="btn-close" style={{ fontSize: '1rem' }} onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <input type='text' onChange={(e) => setEditedTitle(e.target.value)} value={editedTitle} className='form-control mb-2' name='title' required />
                        <textarea
                            name='description'
                            className="form-control"
                            rows="4"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            Delete
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};



const NewsCard = () => {
    const newsCreateUrl = basePath + urls.news.create
    const newsGetUrl = basePath + urls.news.find
    const { data: newsData, mutate: newsMutate, isLoading } = useGetter(newsGetUrl)
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editnews, setEditnews] = useState(null)
    const [newNewsInput, setNewNewsInput] = useState("")
    const [newNewsTitle, setNewNewsTitle] = useState("")
    const session = useSelector(selectSession)

    const handleEditClick = (news) => {
        setEditnews(news) // Set the initial value of the edit textarea
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setEditnews(null) // Clear the edited state when closing the modal
        newsMutate()
    };

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleAddModalClose = () => {
        setShowAddModal(false);
        setNewNewsInput("");
        setNewNewsTitle("");
        newsMutate()

    };

    const handleAddNews = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const res = axios.post(newsCreateUrl, {
            "title": data.get("title"),
            "description": data.get("description") || ""
        }, {
            headers: {
                authorization: `Bearer ${session.token}`
            }
        })
        handleAddModalClose();
    };

    return (
        <div className='row'>
            <div className="col-3"></div>
            <div className="col-6" style={{ background: "#1B2730", boxShadow: "1px 1px 20px 0px black" }}>

                <ul className="newsSection list-group">
                    {newsData?.data?.length > 0 ? newsData?.data.map((eachNews, index) => (
                        <li className="list-group-item mt-2" style={{ backgroundColor: "#1b2730", borderTopWidth: '1px' }} key={index}>
                            <div style={{ display: 'flex', alignItems: '', fontSize: '1.1rem', cursor: 'pointer', borderTopWidth: '1px' }}>
                                {/* <i className="fa-solid fa-circle me-2" style={{ paddingTop: '9px' }}></i> */}
                                <div className="row">
                                    <div className="col">
                                        <h4 style={{ color: 'white' }}>{eachNews.title}</h4>
                                        <span style={{ flex: 1, color: "gray" }}>
                                            {eachNews.description}
                                        </span>
                                    </div>
                                    <div className="col-1" >
                                        <span className="material-symbols-rounded cover-edit" onClick={() => handleEditClick(eachNews)}>
                                            edit
                                        </span>

                                    </div>
                                </div>


                            </div>
                        </li>
                    )) : <h3 style={{ color: "white", padding: "0.5rem 0" }}>No News Added Yet</h3>}
                </ul>
                <button type="button" className="btn btn-primary mt-3 w-100" onClick={handleAddClick}>
                    Add
                </button>
            </div>
            <div className="col-3"></div>

            {editnews && <EditNewsModal show={showEditModal} newsData={editnews} handleClose={handleEditModalClose} session={session}></EditNewsModal>}
            {/* Add News */}


            {/* Add News Modal */}
            <div className={`modal mt-5 ${showAddModal ? 'show' : ''}`} style={{ display: showAddModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form onSubmit={handleAddNews}>

                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: 'black' }}>
                                    Add News
                                </h5>
                                <button type="button" className="btn-close btn" style={{ fontSize: '1rem' }} onClick={handleAddModalClose}></button>
                            </div>
                            <div className="modal-body">
                                <input type='text' value={newNewsTitle} onChange={(e) => setNewNewsTitle(e.target.value)} className='form-control mb-2' placeholder='Title' name='title' required />

                                <textarea
                                    placeholder='Description'
                                    name='description'
                                    id="addNewsTextarea"
                                    className="form-control"
                                    rows="4"
                                    value={newNewsInput}
                                    onChange={(e) => setNewNewsInput(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleAddModalClose}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add News
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NewsCard;
