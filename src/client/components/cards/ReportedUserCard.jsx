import urls, { basePath, serverPath } from '@utils/urls'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectSession } from '../auth/authSlice'
import tempImage from "@client/assets/images/profile.png"
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'

const ReportedUserCard = (props) => {
  const session = useSelector(selectSession)
  const ignoreHandler = async () => {
    const res = await axios.delete(basePath + urls.report.deleteById.replace(":id", props?.report?.user?._id), {
      headers: {
        authorization: `Bearer ${session.token}`
      }
    })
    if (res?.status === 200) {
      props.mutate();
      toast.success("Ignored Reported User Successfully")
    }
    else {
      toast.error("Something went wrong!!")
    }
  }
  const clickHandler = async () => {
    const res1 = await axios.delete(basePath + urls.user.delete.replace(":id", props?.report?.user?._id), {
      headers: {
        authorization: `Bearer ${session.token}`
      }
    })
    const res2 = await axios.delete(basePath + urls.report.deleteById.replace(":id", props?.report?.user?._id), {
      headers: {
        authorization: `Bearer ${session.token}`
      }
    })
    if (res1?.status === 200 && res2?.status === 200) {
      props.mutate();
      toast.success("Removed User Successfully")
    }
    else {
      toast.error("Something went wrong!!")
    }
  }
  return (
    <>
      <div className="invitation">
        <Link to={`/profile/${props?.report?.user?._id}`}>
          <div className="userProfile networkUserProfile">
            <div className="profileImgPost">
              <img
                src={props?.report.user?.profilePhoto ? serverPath + props?.report.user?.profilePhoto : tempImage}
                alt="profileImg"
              />
            </div>
            <div className="userInfo">
              <h5>{props?.report?.user?.name?.first} {props?.report?.user?.name?.last}</h5>
              <p>{props?.report?.user?.bio}</p>
            </div>
          </div>
        </Link>
        <div className="networkOption">
          <Typography fontSize="1rem">
          {/* <div className="specialLink"> */}
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target={`#commentModal${props.report?._id}`}
            >
              <i className="fa-solid fa-eye"></i> View Reporters
            </Link>
          {/* </div> */}
          </Typography>
          <button className="noborderButton" type='button' onClick={ignoreHandler}>Ignore</button>
          <button className="text-button" style={{ fontSize: "1rem" }} type='button' onClick={clickHandler}>Remove</button>
        </div>
      </div>
      <div
        className="modal fade mt-5"
        id={`commentModal${props.report?._id}`}
        tabIndex="-1"
        aria-labelledby="articleModalLabel"
        aria-hidden="true"
        style={{ color: "black" }}
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundColor: "#1b2730" }}
          >
            <div className="modal-header" style={{ color: "#fff" }}>
              <h5 className="modal-title" id="exampleModalLabel">
                Reporters
              </h5>
            </div>
            <div className="modal-body">
              <div
                className="allLikes"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {
                  props?.report?.by.map((rep, index) => (
                    <div className="userProfile" key={index}>
                      <div className="profileImgPost">
                        <img
                          src={
                            rep?.user?.profilePhoto
                              ? serverPath + rep?.user.profilePhoto
                              : tempImage
                          }
                          alt="profileImg"
                        />
                      </div>
                      <div
                        className="userInfo"
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "rgb(231, 231, 231)",
                          padding: "0.25rem 0.5rem",
                          width: "80%",
                        }}
                      >
                        <h6
                          style={{
                            color: "rgb(129, 129, 129)",
                            margin: "0",
                          }}
                        >
                          {rep?.user.name.first}{" "}
                          {rep?.user.name.last}
                        </h6>
                        <p
                          style={{
                            color: "rgb(129, 129, 129)",
                            fontSize: "0.75rem",
                          }}
                        >
                          {rep?.user.bio}
                        </p>
                        <p style={{ marginTop: "1rem" }}>
                          {rep?.reason}
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportedUserCard