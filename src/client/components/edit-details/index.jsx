import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConnectedWorld from '../../assets/images/connected-world.png';
import { selectLoggedInUser, updateUserAsync } from '../auth/authSlice';


const GetUserDetails = ({ role, user, dob }) => {
  const loggedInUser = useSelector(selectLoggedInUser)
  const userId = loggedInUser.id
  const dispatch = useDispatch()

  const clickHandler = () => {
    const newUser = { ...loggedInUser, details: { ...loggedInUser.details, firstName: formData.firstName } }
    dispatch(updateUserAsync(newUser))
  }

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [formData, setFormData] = useState({
    firstName: user.firstname || '',
    lastName: user.lastname || '',
    age: user.age || '',
    dob: dob || '',
    workplace: user.workplace || '',
    profileImage: user.imageUrl || '',
    educationType: '',
    instituteName: '',
    joined: '',
    isCurrent: false,
    completed: '',
    remarks: '',
  });

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  return (
    <main className="mainFormContainer">
      <h1 style={{ fontSize: "3rem", fontWeight: "600" }}>Complete Your Profile</h1>
      <section className="formSection">
        <div className="formImgContainer" style={{ maxWidth: "500px", maxHeight: "425px" }}>
          <img src={ConnectedWorld} alt="connected-world" />
        </div>
        <div className="formContainer card">
          {role === 'student' && (
            <form id="detailForm">
              {activeStep === 0 ? (
                <>
                  <h2>Personal Details</h2>
                  <div className="twoInput mt-1">
                    <div className="">
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        className="firstName mt-1"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        readOnly
                        style={{ color: '#808080', cursor: 'not-allowed' }}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        className="lastName mt-1"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        readOnly
                        style={{ color: '#808080', cursor: 'not-allowed' }}
                      />
                    </div>
                  </div>
                  <div className="twoInput mt-1">
                    <div className="">
                      <label htmlFor="">Date of Birth</label>
                      <input
                        type="date"
                        className="dob mt-1"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="">Profile Photo</label>
                      <input
                        type="file"
                        className="profileImage mt-1"
                        name="profileImage"
                        placeholder="Profile Image"
                        // value={formData.profileImage}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="oneInput mt-2">
                    <label htmlFor="">Bio</label>
                    <textarea id="bio" name="bio" rows="4" cols="50"></textarea>
                  </div>
                </>
              ) : null}

              {activeStep === 1 ? (
                <>
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
                  <button type='button' onClick={clickHandler} className="submitButton mt-2" id="detailButton">
                    Edit
                  </button>
                </>
              ) : null}

              {/* Include contact, institute, and address components as needed */}


            </form>
          )}
          {role === 'alumni' && (
            <form id="detailForm">
              {/* ... Alumni form inputs ... */}
            </form>
          )}
        </div>
      </section>
      <MobileStepper
        variant="progress"
        steps={2}
        position="static"
        activeStep={activeStep}
        sx={{ width: 500, height: 40 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 1}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </main>
  );
};

export default GetUserDetails;
