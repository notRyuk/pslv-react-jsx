import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import companyImg from "../../assets/images/company.png";
import axios from 'axios';
import urls, { serverPath, basePath } from '@utils/urls';
import { selectSession } from '../auth/authSlice';
import Loading from '../loading';
import { useGetter, usePoster } from '../../hooks/fetcher';
import Footer from '../footer';
import Modal from '../modal';
import { Autocomplete, TextField } from '@mui/material';
const ProfileComponent = ({
    user,
    usermain,
    contact,
    address,
    connection,
    job,
    post,
    postImpression,
    aboutData,
    interests,
    users,
}) => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showInterestModal, setShowInterestModal] = useState(false);
    const [newSkill, setNewSkill] = useState("");

    // const [tempUser, setTempUser] = useState({})
    // const [isLoading, setIsLoading] = useState(true);
    const [others, setOthers] = useState(false)

    function addNewSkill() {
        skills?.push()
    }
    const params = useParams()
    const profileUrl = basePath + urls.user.profile.get.replace(':id', params.id)
    const session = useSelector(selectSession)

    const connectionsUrl = basePath + urls.connections.getByUser.replace(":user", params.id)
    const postUrl = basePath + urls.posts.get.replace(":id", params.id)
    const { data: connectedUser, mutate: connectionMutate, isLoading: connectionIsLoading } = useGetter(connectionsUrl)
    const { data: postData, mutate: postMutate, isLoading: postIsLoading } = useGetter(postUrl)
    const { data: skillsData } = useGetter(basePath+urls.skills)
    const [changedSkill, setChangedSkill] = useState("")

    const handleAddSkill = async () => {
        const res = await axios.put(basePath+urls.user.profile.addSkill, {skill: changedSkill}, {
            headers: {
                authorization: `Bearer ${session?.token}`
            }
        })
        if(res?.data) {
            setShowSkillModal(false)
            setChangedSkill("")
            tempUserMutate()
        }
    }

    const {data: tempUser, mutate: tempUserMutate, isLoading} = useGetter(profileUrl)

    // const fetchProfileData = async () => {
    //     try {
    //         const res = await axios.get(profileUrl, {
    //             headers: {
    //                 authorization: `Bearer ${session.token}`
    //             },
    //         });
    //         setTempUser(res.data.data);
    //     } catch (error) {
    //         console.error("Error while fetching profile data:", error);
    //     } finally {
    //         // Set loading to false regardless of success or failure
    //         setIsLoading(false);
    //     }
    // };

    useEffect(() => {
        setOthers(session?.user._id !== params.id)
        // fetchProfileData();
    }, [session.token]);

    // const { trigger: createProfile } = usePoster(basePath+urls.user.profile.create)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const adddress = {}
        for (const entry of formData.entries()) {
            address[entry[0]] = entry[1]
        }
        // createProfile({address, role: session?.user?.role})
        const res = await axios.post(basePath + urls.user.profile.create, { address, role: session?.user?.role }, {
            headers: {
                authorization: `Bearer ${session?.token}`
            }
        }).then(res => res.data).catch(err => err?.response?.data || err)
        // console.log(res)
    }

    return (
        <>
            {isLoading ? <Loading></Loading> :
                <div className="profileContainer">
                    {/* Main Container */}
                    <div className="container-main">
                        {/* Profile Card */}
                        <div className="card profileCard-profile">
                            {/* Cover and Edit Button */}
                            <div className="cover"></div>
                            {
                                tempUser?.data?._id === session.user._id && (
                                    <Link to="/edit-details">
                                        <span className="material-symbols-rounded cover-edit">edit</span>
                                    </Link>
                                )
                            }

                            {/* Profile Information */}
                            <div className="profileInfo">
                                <img src={serverPath + tempUser?.data?.profilePhoto} alt="profileImg" className="profileImg" />
                            </div>
                            {/* <p>{fetchedUser.email}</p> */}
                            {/* Profile Details */}
                            <div className="profileDetails w-100">
                                {/* Personal Information */}
                                <div className="personal">
                                    {/* Edit Title */}
                                    <div className="edit-title">
                                        <h3>
                                            {tempUser?.data?.name?.first} {tempUser?.data?.name?.last} (
                                            <span style={{ textTransform: 'capitalize' }}>{tempUser?.data?.role}</span>)
                                        </h3>
                                    </div>
                                    {/* Personal Description */}
                                    <p className="personalDescription">{tempUser?.data?.bio || ""}</p>

                                    {/* Location Information */}
                                    <p className="location-info">
                                        <Link to="#" data-bs-toggle="modal" data-bs-target="#addressModal" className="linkStyle">
                                            Address
                                        </Link>
                                        <span style={{ fontSize: '15px' }}>•</span>
                                        <Link to="#" className="linkStyle" data-bs-toggle="modal" data-bs-target="#contactModal">
                                            Contact Info
                                        </Link>
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
                                                        Email : {tempUser?.data?.email}
                                                    </div>
                                                    <div className="mb-2">
                                                        Phone : {tempUser?.data?.phone}
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
                                    <p className="connection-info">{connectedUser?.data.length} connections</p>

                                    {/* Additional Info for Alumni */}
                                    {tempUser?.data?.role === 'alumni' && (
                                        <p className="connection-info">
                                            {job} Jobs posted
                                        </p>
                                    )}
                                </div>
                                {/* Apply for Alumni Form (conditionally rendered) */}
                                {tempUser?.data?.role === 'student' && tempUser?.data?._id === session.user._id && (
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
                                        <Link to={others ? '#' : '/edit-posts'} className="linkStyle">{postData?.data?.length} Posts</Link>
                                        <div style={{ fontSize: '12px' }}>Discover and Edit your post.</div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span className="material-symbols-rounded">bar_chart</span>
                                    </div>
                                    <div style={{ fontSize: '20px', textDecoration: 'none' }}>
                                        <Link to={others ? '#' : '/edit-posts'} className="linkStyle">{postImpression} Post impressions</Link>
                                        <div style={{ fontSize: '12px' }}>Checkout who's engaging with your posts.</div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span className="material-symbols-rounded">group</span>
                                    </div>
                                    <div style={{ fontSize: '20px', textDecoration: 'none' }}>
                                        <Link to={session?.user._id !== params.id ? '#' : '/network'} className="linkStyle">{connectedUser?.data.length} connections</Link>
                                        <div style={{ fontSize: '12px' }}>See Your connections.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form id='detailForm' onSubmit={handleSubmit}>
                            <h2>Address Details</h2>
                            <div className="twoInput">
                                <div className="div">
                                    {/* <label htmlFor="name">Name</label> */}
                                    <input type="text" name="name" placeholder='Name' id="name" />
                                </div>
                                <div className="div">

                                    {/* <label htmlFor="buildingName">Building Name</label> */}
                                    <input type="text" name="buildingName" placeholder='Building Name' id="buildingName" />
                                </div>
                            </div>
                            <div className="oneInput">
                                {/* <label htmlFor="">Adress Line 1</label> */}
                                <input type="text" name="line1" placeholder='Address Line 1' id='line1' />
                            </div>
                            <div className="oneInput">
                                {/* <label htmlFor="">Adress Line 2</label> */}
                                <input type="text" name="line2" placeholder='Adress Line 2' id='line' />
                            </div>
                            <div className="oneInput">
                                {/* <label htmlFor="">Street</label> */}
                                <input type="text" name="street" placeholder='Street name' id='street' />
                            </div>
                            <div className="twoInput">
                                <div className="div">
                                    <input type="text" name='city' placeholder='city' id='city' />
                                </div>
                                <div className="div">
                                    <input type="text" name="state" placeholder='State' id="state" />
                                </div>
                            </div>
                            <div className="twoInput">
                                <div className="div">
                                    {/* <label htmlFor="state">State</label> */}
                                    <input type="text" name="country" placeholder='country' id="country" />
                                </div>
                                <div className="div">

                                    {/* <label htmlFor="pinCode">Pin Code</label> */}
                                    <input type="number" name="pinCode" placeholder='Pin Code' id="pinCode" />
                                </div>
                            </div>
                            <button type='submit' className="submitButton mt-2" id="detailButton">
                                Submit
                            </button>
                        </form>

                        {/* Profile Card - About */}
                        <div className="profile-card card">
                            <div className="about-title section-title">
                                <div style={{ fontSize: '22px', fontWeight: 'bold' }}>About</div>
                                {!others &&
                                    <div>
                                        <Link to="#" data-bs-toggle="modal" data-bs-target="#aboutModal" className="linkStyle">
                                            <span className="material-symbols-rounded about-edit">edit</span>
                                        </Link>
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
                                        <img src={companyImg} height="100px" width="100px" alt="company-logo" />
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
                                    {/* <img src="/images/college.png" height="100px" width="100px" alt="college-logo" /> */}
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
                                            <Link data-bs-toggle="modal" onClick={() => setShowSkillModal(true)}>
                                                <span className="material-symbols-rounded about-edit">add</span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Skills Modal */}
                            {/* <div className={`modal profileModal fade ${showSkillModal ? 'show' : ''}`} id="skillModal" tabIndex={-1} aria-labelledby="articleModalLabel" aria-hidden="true" style={{ color: 'black' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add a Skill</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                console.log(skills);
                                                const skill = {
                                                    skill: newSkill
                                                }
                                                skills?.push(skill);
                                            }}>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Skill</label>
                                                    <input type="text" onChange={(e) => { setNewSkill(e.target.value) }} className="form-control" name="skill" />
                                                </div>
                                                <button type="submit" className="btn submitButton" data-bs-dismiss="modal" style={{ width: '100%' }}>Add Skill</button>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {/* Skills Container */}
                            <div className="skill-container">
                                {/* Render Skills */}
                                {tempUser?.data?.profile?.skills?.length > 0 ? (
                                    tempUser?.data?.profile?.skills?.map((skill, index) => (
                                        <div key={index} className="skill-main">
                                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{skill.name}</div>
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
                                            <Link to="#" data-bs-toggle="modal" data-bs-target="#interestModal">
                                                <span className="material-symbols-rounded about-edit">add</span>
                                            </Link>
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
                    <div className="container-right content">
                        {/* <div className="card left-group" style={{ color: '#cacaca' }}>
                    <h6>Connect with more people.....</h6>
                    {users.map((reqUser) => (
                        <form key={requser?.user} action="/api/connection/create" method="post">
                            <div className="card left-group" style={{ color: '#cacaca' }}>
                                <h6>Connect with more people.....</h6>
                                {users.map((reqUser, index) => (
                                    <form key={index} action="/api/connection/create" method="post">
                                        <div className="connectSuggestion">
                                            <Link to={`/profile/${requser?.user}`}>
                                                <div className="connectProfile">
                                                    <img src={requser?.imageUrl} alt="personImg" />
                                                    <div className="connectInfo">
                                                        <strong>{requser?.firstname} {requser?.lastname}</strong>
                                                        <small>{requser?.bio}</small>
                                                    </div>
                                                </div>
                                            </Link>
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
                </div> */}
                        <Footer></Footer>
                    </div>
                </div>
            }
            <Modal
                open={showSkillModal}
                setOpen={setShowSkillModal}
                title={"Title"}
                handleSubmit={handleAddSkill}
            >
                <Autocomplete
                    freeSolo
                    options={skillsData?.data?.filter(skill => !tempUser?.data?.profile?.skills?.map(e => e?._id)?.includes(skill?._id))?.map(e => e?.name) || []}
                    renderInput={(params) => (
                        <TextField {...params} label="Add your skills" onChange={e => setChangedSkill(e.target.value)}/>
                    )}
                    onChange={(_, value) => setChangedSkill(value)}
                />
            </Modal>
        </>
    );
};

export default ProfileComponent;
