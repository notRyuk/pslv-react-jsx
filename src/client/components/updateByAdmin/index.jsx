import React from "react";
import "./style.css";
// @ts-ignore
import profile from "@client/assets/images/profile.png";
import { Typography } from "@mui/material"
import { useGetter } from "../../hooks/fetcher";
import urls, { basePath, serverPath } from "../../../utils/urls";
import axios from "axios";
import { selectSession } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminUserUpdate = () => {
  const session = useSelector(selectSession);
  const {data : users, userMutate : userMutate} = useGetter(basePath + urls.user.fetchAll)
  const deleteHandler = async(userId)=> {
    const res = await axios.delete(basePath + urls.user.delete.replace(":id", userId), {
      headers: {
        authorization: `Bearer ${session.token}`
      }
    })
    if(res?.status === 200){
      toast.warning("Deleted user successfully")
      userMutate();
    }
    else{
      toast.error("Something went wrong!!")
    }
  }
  return (
    <div className="row">
      <div className="col-1"></div>
      <div className="col-10 p-4" style={{ background: "#1b2730", borderRadius: "10px" }}>
        <section className="main">
          <div className="main-top">
            <Typography>
              <p
                style={{
                  color: "White",
                  fontSize: "2.5rem",
                  fontWeight: "600",
                  marginBottom: "0.3rem"
                }}
              >
                Manage Users
              </p>
            </Typography>
          </div>
          <section className="attendance" style={{ boxShadow: "1px 1px 20px 0px black", borderRadius: "10px" }}>
            <div className="attendance-list">
              <table className="tablebg">
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>User</th>
                    {/* <th>Profile Image</th> */}
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data.map((user, id) => (
                    <tr key={id}>
                      <td>{id + 1}</td>
                      <td>
                        {" "}
                        <span className="profileImg">
                          <img src={user?.profilePhoto ? serverPath + user?.profilePhoto : profile} alt="Profile" />
                        </span>
                      </td>
                      <td>{user.name.first} {user.name.last}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        <button onClick={()=>{deleteHandler(user?._id)}}>
                          <i
                            className="material-icons"
                            style={{ color: "white" }}
                          >
                            &#xe872;
                          </i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
      {/* <div className="col-4">
        <Typography>
          <Footer />
        </Typography>
      </div> */}
    </div>
  );
};

export default AdminUserUpdate;
