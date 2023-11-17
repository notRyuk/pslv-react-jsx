import React, { useState,useEffect } from 'react';
import "./style.scss";
const ProfileComponent= ({
    user,
    usermain,
    contact,
    address,
    connection,
    job,
    others,
    post,
    postImpression,
    aboutData,
    skills,
    interests,
    users,
}) => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showInterestModal, setShowInterestModal] = useState(false);
    const [newSkill, setNewSkill] = useState("");

    function addNewSkill(){
        skills?.push()
    }
    // useEffect(()=>{

    // },[])
    return (
        <div className="profileContainer">
            {/* Main Container */}
            <div className="container-main">
                {/* Profile Card */}
                <div className="card profileCard-profile">
                    {/* Cover and Edit Button */}
                    <div className="cover"></div>
                    <a href="/edit-details">
                        <span className="material-symbols-rounded cover-edit">edit</span>
                    </a>

                    {/* Profile Information */}
                    <div className="profileInfo">
                        {/* <img src={user?.imageUrl} alt="profileImg" className="profileImg" /> */}
                    </div>

                    {/* Profile Details */}
                    <div className="profileDetails w-100">
                        {/* Personal Information */}
                        <div className="personal">
                            {/* Edit Title */}
                            <div className="edit-title">
                                <h3>
                                    {user?.firstname} {user?.lastname} (
                                    <span style={{ textTransform: 'capitalize' }}>{usermain?.role}</span>)
                                </h3>
                            </div>
                            {/* Personal Description */}
                            <p className="personalDescription">{user?.bio}</p>

                            {/* Location Information */}
                            <p className="location-info">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#addressModal" className="linkStyle">
                                    Address
                                </a>
                                <span style={{ fontSize: '15px' }}>•</span>
                                <a href="#" className="linkStyle" data-bs-toggle="modal" data-bs-target="#contactModal">
                                    Contact Info
                                </a>
                            </p>

                            <div className={`modal profileModal fade ${showContactModal ? 'show' : ''}`} id="contactModal" tabIndex={-1} aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Contact Information</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-2">
                                                Email : {contact?.email}
                                            </div>
                                            <div className="mb-2">
                                                Phone : {contact?.phone}
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`modal profileModal fade ${showAddressModal ? 'show' : ''}`} id="addressModal" tabIndex={-1} aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Address Information</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-2">
                                                Address : {address?.address}
                                            </div>
                                            <div className="mb-2">
                                                City : {address?.city}
                                            </div>
                                            <div className="mb-2">
                                                Pincode : {address?.pincode}
                                            </div>
                                            <div className="mb-2">
                                                State : {address?.state}
                                            </div>
                                            <div className="mb-2">
                                                Country : {address?.country}
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Connection Info */}
                            <p className="connection-info">{connection} connections</p>

                            {/* Additional Info for Alumni */}
                            {usermain?.role === 'alumni' && (
                                <p className="connection-info">
                                    {job} Jobs posted
                                </p>
                            )}
                        </div>
                        {/* Apply for Alumni Form (conditionally rendered) */}
                        {usermain?.role === 'student' && !others && (
                            <form className='alumni-submit ms-auto' action="/apply-for-alumni" method="post">
                                <button className=" btn btn-primary btn-outline">Apply For Alumni</button>
                            </form>
                        )}
                        {/* ... */}
                    </div>
                </div>

                {/* Profile Card - Analytics */}

                <div className="profile-card card">
                    <div className="analytics-title section-title">
                        <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Analytics</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <span className="material-symbols-rounded" style={{ fontSize: '15px' }}>visibility</span>
                            <div style={{ fontSize: '12px' }}>Private for you</div>
                        </div>
                    </div>
                    <div className="analytics-stats">
                        <div>
                            <div>
                                <span className="material-symbols-rounded">description</span>
                            </div>
                            <div style={{ fontSize: '20px', textDecoration: 'none' }}>
                                <a href={others ? '#' : '/edit-posts'} className="linkStyle">{post?.length} Posts</a>
                                <div style={{ fontSize: '12px' }}>Discover and Edit your post.</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className="material-symbols-rounded">bar_chart</span>
                            </div>
                            <div style={{ fontSize: '20px', textDecoration: 'none' }}>
                                <a href={others ? '#' : '/edit-posts'} className="linkStyle">{postImpression} Post impressions</a>
                                <div style={{ fontSize: '12px' }}>Checkout who's engaging with your posts.</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className="material-symbols-rounded">group</span>
                            </div>
                            <div style={{ fontSize: '20px', textDecoration: 'none' }}>
                                <a href={others ? '#' : '/network'} className="linkStyle">{connection} connections</a>
                                <div style={{ fontSize: '12px' }}>See Your connections.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Card - About */}
                <div className="profile-card card">
                    <div className="about-title section-title">
                        <div style={{ fontSize: '22px', fontWeight: 'bold' }}>About</div>
                        {!others &&
                            <div>
                                <a href="#" data-bs-toggle="modal" data-bs-target="#aboutModal" className="linkStyle">
                                    <span className="material-symbols-rounded about-edit">edit</span>
                                </a>
                            </div>
                        }
                    </div>
                    <div className="about-description" style={{ fontSize: '20px' }}>
                        {aboutData !== '' ? aboutData : 'Add About so that people can know you better'}
                    </div>
                </div>

                {/* About Modal */}
                <div className={`modal profileModal fade ${showAboutModal ? 'show' : ''}`} id="aboutModal" tabIndex={-1} aria-labelledby="articleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Your About</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form action="/add-about" method="post">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">About</label>
                                        <textarea className="form-control" name="about" rows={3} defaultValue={aboutData !== '' ? aboutData : ''}></textarea>
                                    </div>
                                    <button type="submit" className="btn submitButton" style={{ width: '100%' }}>Add About</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Card - Working (conditionally rendered) */}
                {usermain?.role === "alumni" && (
                    <div className="profile-card card">
                        <div className="about-title section-title">
                            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Working</div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                                {/* Add any additional elements for alumni working section */}
                            </div>
                        </div>
                        <div className="experience-container">
                            <div className="experience-main">
                                <img src="/images/company.png" height="100px" width="100px" alt="company-logo" />
                                <div style={{ fontSize: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                        Working at {user?.workplace}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Card - Education */}
                <div className="profile-card card">
                    <div className="about-title section-title">
                        <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Education</div>
                    </div>
                    <div className="education-container">
                        <div className="education-main">
                            <img src="/images/college.png" height="100px" width="100px" alt="college-logo" />
                            <div style={{ fontSize: '12px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                    Education at {user?.institute}
                                </div>
                                <div>
                                    {user?.joinYear} <span style={{ fontSize: '15px' }}>•</span> {user?.passYear}
                                </div>
                                <div style={{ paddingTop: '7px' }}></div>
                                {/* Add any additional information about education */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Card - Skills */}
                <div className="profile-card card">
                    {/* Section Title */}
                    <div className="about-title section-title">
                        {/* Title Text */}
                        <div className="title-text" style={{ fontSize: '22px', fontWeight: 'bold' }}>Skills</div>

                        {/* Button Container */}
                        <div className="button-container" style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                            {!others && (
                                <div>
                                    {/* Add Skill Button */}
                                    <a data-bs-toggle="modal" data-bs-target="#skillModal">
                                        <span className="material-symbols-rounded about-edit">add</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills Modal */}
                    <div className={`modal profileModal fade ${showSkillModal ? 'show' : ''}`} id="skillModal" tabIndex={-1} aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add a Skill</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {/* Skill Form */}
                                    <form onSubmit={(e)=>{
                                            e.preventDefault();
                                            console.log(skills);
                                            const skill={
                                                skill:newSkill
                                            }
                                            skills?.push(skill);
                                        }}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Skill</label>
                                            <input type="text" onChange={(e)=>{setNewSkill(e.target.value)}} className="form-control" name="skill" />
                                        </div>
                                        <button type="submit"  className="btn submitButton" data-bs-dismiss="modal" style={{ width: '100%' }}>Add Skill</button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills Container */}
                    <div className="skill-container">
                        {/* Render Skills */}
                        {skills?.length > 0 ? (
                            skills?.map((skill, index) => (
                                <div key={index} className="skill-main">
                                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{skill.skill}</div>
                                </div>
                            ))
                        ) : (
                            // No Skills Message
                            <p>No Skills added</p>
                        )}
                    </div>
                </div>

                {/* Profile Card - Interests */}
                <div className="profile-card card">
                    <div className="about-title section-title">
                        <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Interests</div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                            {!others &&
                                <div>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#interestModal">
                                        <span className="material-symbols-rounded about-edit">add</span>
                                    </a>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Interests Modal */}
                    <div className={`modal profileModal fade ${showInterestModal ? 'show' : ''}`} id="interestModal" tabIndex={-1} aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add an Interest</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form action="/add-interest" method="post">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Interest</label>
                                            <input type="text" className="form-control" name="interest" />
                                        </div>
                                        <button type="submit" className="btn submitButton" style={{ width: '100%' }}>Add Interest</button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interests Container */}
                    <div className="skill-container">
                        {interests?.length > 0 ? (
                            interests?.map((interest, index) => (
                                <div key={index} className="skill-main">
                                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{interest.interest}</div>
                                </div>
                            ))
                        ) : (
                            <p>No Interests added</p>
                        )}
                    </div>
                </div>

            </div>

            {/* Right Container */}
            {/* <div className="container-right content">
                <div className="card left-group" style={{ color: '#cacaca' }}>
                    <h6>Connect with more people.....</h6>
                    {users.map((reqUser) => (
                        <form key={requser?.user} action="/api/connection/create" method="post">
                            <div className="card left-group" style={{ color: '#cacaca' }}>
                                <h6>Connect with more people.....</h6>
                                {users.map((reqUser, index) => (
                                    <form key={index} action="/api/connection/create" method="post">
                                        <div className="connectSuggestion">
                                            <a href={`/profile/${requser?.user}`}>
                                                <div className="connectProfile">
                                                    <img src={requser?.imageUrl} alt="personImg" />
                                                    <div className="connectInfo">
                                                        <strong>{requser?.firstname} {requser?.lastname}</strong>
                                                        <small>{requser?.bio}</small>
                                                    </div>
                                                </div>
                                            </a>
                                            <input type="hidden" name="from" value={user?.user} />
                                            <input type="hidden" name="to" value={requser?.user} />
                                            <input type="hidden" name="type" value="MUTUAL" />
                                            <button type="submit">Connect</button>
                                        </div>
                                    </form>
                                ))}
                            </div>
                        </form>
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default ProfileComponent;
