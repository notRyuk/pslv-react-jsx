import React, { useState } from 'react';

const NewsCard = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailView, setShowDetailView] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [edited, setEdited] = useState("");
    const [newNewsInput, setNewNewsInput] = useState("");
    const [selectedNewsIndex, setSelectedNewsIndex] = useState(null);

    const [news, setNews] = useState([
        "Mascot announces new tools for job seekers. Mascot has just released a suite of new tools to help job seekers find their next career move. Mascot hopes that these new tools will help job seekers feel more confident and empowered in their job search.",
        "Mascot announces new tools for job seekers. Mascot has just released a suite of new tools to help job seekers find their next career move. Mascot hopes that these new tools will help job seekers feel more confident and empowered in their job search.",
    ]);

    const MAX_CHARACTERS = 85;

    const handleEditClick = (index) => {
        setEditIndex(index);
        setEdited(news[index]); // Set the initial value of the edit textarea
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setEdited(""); // Clear the edited state when closing the modal
    };

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleAddModalClose = () => {
        setShowAddModal(false);
        setNewNewsInput("");
    };

    const handleAddNews = () => {
        if (newNewsInput.trim() !== "") {
            setNews((prevNews) => [...prevNews, newNewsInput]);
            setShowAddModal(false);
            setNewNewsInput("");
        } else {
            console.log("Please enter valid news");
        }
    };

    const handleEditInputChange = (e) => {
        const updated = e.target.value;
        setEdited(updated);
    };

    const handleUpdateNews = () => {
        if (edited.trim() !== "") {
            const updatedNews = [...news];
            updatedNews[editIndex] = edited;
            setNews(updatedNews);
            setEditIndex(null);
            setShowEditModal(false);
            setEdited("");
        } else {
            console.log("Please enter valid news");
        }
    };

    const handleNewsItemClick = (index) => {
        setSelectedNewsIndex(index);
        setShowDetailView(true);
    };

    const handleDetailViewClose = () => {
        setShowDetailView(false);
        setSelectedNewsIndex(null);
    };

    const handleDelete = ()=>{
        
    }

    return (
        <>
            <ul className="newsSection list-group">
                {news.map((eachNews, index) => (
                    <li className="list-group-item mt-2" style={{ backgroundColor: "#1b2730", borderTopWidth: '1px' }} key={index}>
                        <div style={{ display: 'flex', alignItems: '', fontSize: '1.1rem', cursor: 'pointer', borderTopWidth: '1px' }}>
                            <i className="fa-solid fa-circle me-2" style={{ paddingTop: '9px' }}></i>
                            <div className="row">
                                <div className="col">
                                    <span style={{ flex: 1, color: "#fff" }} onClick={() => handleNewsItemClick(index)}>
                                        {eachNews.length > MAX_CHARACTERS ? `${eachNews.slice(0, MAX_CHARACTERS)}...` : eachNews}
                                    </span>
                                </div>
                                <div className="col-1">
                                    <span className="material-symbols-rounded cover-edit" onClick={() => handleEditClick(index)}>
                                        edit
                                    </span>
                                </div>
                            </div>


                        </div>
                    </li>
                ))}
            </ul>

            {/* Add News */}
            <button type="button" className="btn btn-primary mt-3" onClick={handleAddClick}>
                Add
            </button>

            {/* Add News Modal */}
            <div className={`modal mt-5 ${showAddModal ? 'show' : ''}`} style={{ display: showAddModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: 'black' }}>
                                Add News
                            </h5>
                            <button type="button" className="btn-close" onClick={handleAddModalClose}></button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                id="addNewsTextarea"
                                className="form-control"
                                rows="4"
                                value={newNewsInput}
                                onChange={(e) => setNewNewsInput(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleAddModalClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAddNews}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit News Modal */}
            <div className={`modal mt-5 ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: 'black' }}>
                                Edit News
                            </h5>
                            <button type="button" className="btn-close" onClick={handleEditModalClose}></button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                className="form-control"
                                rows="4"
                                value={edited}
                                onChange={(e) => handleEditInputChange(e)}
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleDelete()}>
                                Delete
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdateNews}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Detail View Modal */}
            <div className={`modal mt-5 ${showDetailView ? 'show' : ''}`} style={{ display: showDetailView ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: 'black', fontSize: "1.5rem", fontWeight: "600" }}>
                                News Detail
                            </h5>
                            <button type="button" className="btn-close" onClick={handleDetailViewClose}></button>
                        </div>
                        <div className="modal-body" style={{ color: "#6f6f6f" }}>
                            <p style={{ fontSize: "1.2rem", lineHeight: "1.7", letterSpacing: "1px" }}>{selectedNewsIndex !== null ? news[selectedNewsIndex] : ''}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleDetailViewClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ... (remaining JSX code) */}
        </>
    );
};

export default NewsCard;
