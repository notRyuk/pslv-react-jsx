import React, { useState } from "react";
import { useSelector } from "react-redux";
import urls, { basePath, serverPath } from "@utils/urls";
import tempImage from "@client/assets/images/profile.png";
import { Link } from "react-router-dom";
import { useGetter } from "../../hooks/fetcher";
import { selectSession } from "../auth/authSlice";
import axios from "axios";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import PostCard from "./PostCard";

const ReportedPost = () => {
  const [reportData, updateReportData] = useState(null);
  const [post, setPost] = useState(null);
  const [showPost, setShowPost] = useState(false);

  const { data: reportedPostData, mutate: reportedPostMutate } = useGetter(
    basePath + urls.reportedPost.getAll
  );

  const session = useSelector(selectSession);

  const ignoreHandler = async (report) => {
    try {
      const res = await axios.delete(
        basePath +
        urls.reportedPost.deleteById.replace(":id", report?.post?._id),
        {
          headers: {
            authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (res?.status === 200) {
        reportedPostMutate();
        toast.success("Ignored Reported Post Successfully");
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error ignoring reported post:", error);
      toast.error("An error occurred while ignoring reported post");
    }
  };

  const removeHandler = async (report) => {
    try {
      const res1 = await axios.delete(
        basePath + urls.post.delete.replace(":id", report?.post?._id),
        {
          headers: {
            authorization: `Bearer ${session.token}`,
          },
        }
      );

      const res2 = await axios.delete(
        basePath +
        urls.reportedPost.deleteById.replace(":id", report?.post?._id),
        {
          headers: {
            authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (res1?.status === 200 && res2?.status === 200) {
        reportedPostMutate();
        toast.success("Removed Post Successfully");
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error removing reported post:", error);
      toast.error("An error occurred while removing reported post");
    }
  };

  const uniquePosts = reportedPostData?.data?.reduce((unique, report) => {
    const existing = unique.find((item) => item.post?._id === report.post?._id);
    if (!existing) {
      unique.push(report);
    }
    return unique;
  }, []);

  const showReportingUsers = async (post) => {
    try {
      const res = await axios.get(
        basePath + urls.reportedPost.getByPostId.replace(":post", post),
        {
          headers: {
            authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (res?.status === 200) {
        updateReportData(res.data);
      } else {
        toast.error("Failed to fetch reporting users");
      }
    } catch (error) {
      console.error("Error fetching reporting users:", error);
      toast.error("An error occurred while fetching reporting users");
    }
  };

  const showReportedPost = async (postId) => {
    console.log(postId);
    try {
      const res = await axios.get(
        basePath + urls.posts.getByPostId.replace(":id", postId),
        {
          headers: {
            authorization: `Bearer ${session.token}`
          }
        }
      );

      if (res?.status === 200) {
        setPost(res.data.data);
        setShowPost(true);
      } else {
        toast.error("Failed to fetch reported post");
      }
    } catch (error) {
      console.error("Error fetching reported post:", error);
      toast.error("An error occurred while fetching reported post");
    }
  };

  return (
    <>
      <div className="row mx-auto" style={{ maxWidth: "1400px" }}>
        <div className="col-1"></div>
        <div className="col-10 p-4" style={{ background: "#1b2730", borderRadius: "10px" }}>
          <section className="main">
            <div className="main-top my-2">
              <Typography>
                <p
                  style={{
                    color: "White",
                    fontSize: "2.5rem",
                    fontWeight: "600",
                    marginBottom: "0.3rem"
                  }}
                >
                  Reported Posts
                </p>
              </Typography>
            </div>
            <section className="attendance" style={{ boxShadow: "1px 1px 20px 0px black", borderRadius: "10px" }}>
              <div className="attendance-list">
                <table className="tablebg align-middle">
                  <thead>
                    <tr>
                      <th scope="col">SNo.</th>
                      <th scope="col">Post ID</th>
                      <th scope="col">Reports</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniquePosts?.length > 0 ? (
                      uniquePosts.map((report, id) => (
                        <tr key={id}>
                          <td className="ms-2">{id + 1}</td>
                          <td>
                            <div className="specialLink">
                              <Link
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target={'#postModal'}
                                onClick={() => {
                                  showReportedPost(report?.post?._id);
                                }}
                                style={{ color: "white" }}
                              >
                                {report?.post?._id}
                              </Link>
                            </div>

                          </td>
                          <td>
                            <div className="specialLink">
                              <Link
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target={`#reportModal${report?.post?._id}`}
                                onClick={() => {
                                  showReportingUsers(report?.post?._id);
                                }}
                                style={{ color: "white" }}
                              >
                                <i className="fa-solid fa-eye"></i> View Reporters
                              </Link>
                            </div>
                          </td>
                          <td>
                            <div className="postOptions">
                              <button
                                className="btn"
                                style={{background: "#808080", outline: "none", border: "none", color: "white"}}
                                type="button"
                                onClick={() => ignoreHandler(report)}
                              >
                                Ignore
                              </button>

                              <button
                                className="btn btn-outline-danger ms-2"
                                type="button"
                                style={{background: "#E74C3C", outline: "none", border: "none", color: "white"}}
                                onClick={() => removeHandler(report)}
                              >
                                Delete Post
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">
                          <h3>No Reported Post Found!!</h3>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </div>

      {uniquePosts?.map((report, id) => (
        <div
          key={id}
          className="modal fade mt-5"
          id={`reportModal${report?.post?._id}`}
          data-bs-backdrop="true"
          tabIndex={-1}
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
                <h5 style={{ fontWeight: "600", letterSpacing: "0.6px" }} className="modal-title" id="exampleModalLabel">
                  Reports by Users
                </h5>
                <button
                  type="button"
                  className="btn-close  btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ fontSize: "1.2rem" }}
                  onClick={() => {
                    updateReportData(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div
                  className="allLikes"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {reportData &&
                    reportData.data?.map((report, index) => (
                      <div className="userProfile" key={index}>
                        <div className="profileImgPost">
                          <Link to={`/profile/${report?.by?._id}`}>
                            <img
                              src={
                                report?.by?.profilePhoto
                                  ? serverPath + report?.by.profilePhoto
                                  : tempImage
                              }
                              data-bs-dismiss="modal"
                              alt="profileImg"
                            />
                          </Link>
                        </div>
                        <div
                          className="userInfo"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "#05141c",
                            color: "white",
                            padding: "0.25rem 0.5rem",
                            width: "80%",
                          }}
                        >
                          <h5 className="mb-0 pb-0">{report?.by?.name?.first} {report?.by?.name?.last}</h5>
                          <hr className="m-0 p-0" />
                          <p style={{ marginTop: "1rem" }}>{report?.reason}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      ))}

      <div
        className="modal fade mt-5"
        data-bs-backdrop="true"
        id={`postModal`}
        tabIndex={-1}
        aria-labelledby="postModal"
        aria-hidden="true"
        style={{ color: "black" }}
      >
        <div className="modal-dialog modal-lg">
          <div
            className="modal-content"
            style={{ backgroundColor: "#1b2730" }}
          >
            <div className="modal-header" style={{ color: "#fff" }}>
              <h4 className="modal-title" id="exampleModalLabel">
                Reported Post
              </h4>
              <button
                type="button"
                className="btn-close  btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ fontSize: "1.2rem" }}
                onClick={() => {
                  setShowPost(false);
                  setPost(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <Typography>
                {showPost && <PostCard report={true} post={post}></PostCard>}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportedPost;
