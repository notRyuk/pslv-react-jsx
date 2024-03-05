import React, { useEffect, useState } from "react";
import "./style.css";
// @ts-ignore
import profile from "@client/assets/images/profile.png";
import { FormControlLabel, Radio, Typography } from "@mui/material"
import { useGetter } from "../../hooks/fetcher";
import urls, { basePath, serverPath } from "../../../utils/urls";
import axios from "axios";
import { selectSession } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../loading";

const InstituteAdminHandleuser = () => {
  const session = useSelector(selectSession);
  const [input, setInput] = useState("")
  const [role, setRole] = useState("all")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [allUsers, setAllUsers] = useState([])
  // const {data : usersData, userMutate : userMutate} = useGetter(basePath + urls.user.fetchAll)

  const fetchUsers = async()=>{
    const res = await axios.get(basePath + urls.user.fetchUsersbyInstitute, {
      headers: {
        authorization: `Bearer ${session.token}`
      }
    })
    console.log(res);
    if(res?.data?.status === "success"){
      setAllUsers(res?.data?.data)
      setUsers(res?.data?.data)
      setLoading(false)
    }
  }

  const deleteHandler = async(userId)=> {
    const res = await axios.delete(basePath + urls.user.delete.replace(":id", userId), {
      headers: {
        authorization: `Bearer ${session.token}`
      }
    })
    if(res?.status === 200){
      toast.warning("Deleted user successfully")
      setRole("all")
      setInput("")
      fetchUsers()
    }
    else{
      toast.error("Something went wrong!!")
    }
  }
  useEffect(()=>{
    fetchUsers()
  },[])

  useEffect(()=>{
    const handleFilter = ()=>{
      const filteredResult = allUsers.filter(user => {
        return (
            user &&
            user.email &&
            (input ? user.email.toLowerCase().startsWith(input.toLowerCase()) : true) &&
            (role !== "all" ? user.role == role : true)
        );
      })
      // console.log(filteredResult);
      setUsers(filteredResult)
    }
    handleFilter();
  },[input, role])

  const handleChange = (value)=>{
    setInput(value)
  }

  const handleRole = (e)=>{
    setRole(e.target.value)
  }

  return (
    <div className="row">
      <div className="col-1"></div>
      <div className="col-10 p-4" style={{ background: "#1b2730", borderRadius: "10px" }}>
        <section className="main">
          <div className="main-top">
            <Typography sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
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
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <div>
                <FormControlLabel
                  control={<Radio />}
                  label="All"
                  value="all"
                  checked={role === 'all'}
                  onChange={handleRole}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Student"
                  value="student"
                  checked={role === 'student'}
                  onChange={handleRole}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Alumni"
                  value="alumni"
                  checked={role === 'alumni'}
                  onChange={handleRole}
                />
              </div>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <input className="searchEmail" type="text" placeholder="search by email" onChange={(e)=>handleChange(e.target.value)}/>
              </div>
              </div>
            </Typography>
          </div>
          <section className="attendance" style={{ boxShadow: "1px 1px 20px 0px black", borderRadius: "10px" }}>
            <div className="attendance-list">
              {loading ? <Loading></Loading> : 
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
                {users?.length > 0 ? <tbody>
                  {/* {console.log(users)} */}
                  {users.map((user, id) => (
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
                </tbody> : <div style={{textAlign: "center"}}><h3>No Users Found</h3></div>}
              </table> }
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

export default InstituteAdminHandleuser;
