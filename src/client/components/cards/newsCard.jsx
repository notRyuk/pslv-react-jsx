import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsCard = (props) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
    };

    const handleSaveChanges = (editedContent) => {
        // Implement your logic to save the edited content
        console.log('Saving changes:', editedContent);
        setShowEditModal(false);
    };

    return (
        <>
            <ul className="newsSection list-group">
                <li className="list-group-item">
                    <i className="fa-solid fa-circle me-2"></i> Mascot announces new tools for job seekers
                    Mascot has just released a suite of new tools to help job seekers find their next career move. Mascot hopes that these new tools will help job seekers feel more confident and empowered in their job search.
                </li>
            </ul>

            {/* Edit Button */}
            <button type="button" className="btn btn-primary mt-3" onClick={handleEditClick}>
                Edit
            </button>

            {/* Edit Modal */}
            <div className={`modal ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit News</h5>
                            <button type="button" className="btn-close" onClick={handleModalClose}></button>
                        </div>
                        <div className="modal-body">
                            {/* Add form elements for editing content */}
                            <textarea className="form-control" rows="4"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => handleSaveChanges('edited content')}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal-backdrop fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}></div>
        </>
    );
};

export default NewsCard;
