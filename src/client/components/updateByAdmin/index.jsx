import React from "react";
import "./style.css";
import profile from "@client/assets/images/profile.png";
import { Typography } from "@mui/material"
import { useGetter } from "../../hooks/fetcher";
import urls, { basePath, serverPath } from "../../../utils/urls";

const AdminUserUpdate = () => {
  const {data : users, userMutate : userMutate} = useGetter(basePath + urls.user.fetchAll)
  // const users = [
  //   {
  //     id: 1,
  //     email: "abc@gmail.com",
  //     profileImage: "https://sapnokamatlab.co.in/wp-content/uploads/2023/08/Sher.webp",
  //     username: "Cityville",
  //     phone: "8899665533",
  //     role: "Student"
  //   },
  //   {
  //     id: 1,
  //     email: "abc@gmail.com",
  //     profileImage: "https://sapnokamatlab.co.in/wp-content/uploads/2023/08/Sher.webp",
  //     username: "Cityville",
  //     phone: "8899665533",
  //     role: "Student"
  //   },
  //   {
  //     id: 1,
  //     email: "abc@gmail.com",
  //     profileImage: "https://sapnokamatlab.co.in/wp-content/uploads/2023/08/Sher.webp",
  //     username: "Cityville",
  //     phone: "8899665533",
  //     role: "Student"
  //   },
  //   {
  //     id: 1,
  //     email: "abc@gmail.com",
  //     profileImage: "https://sapnokamatlab.co.in/wp-content/uploads/2023/08/Sher.webp",
  //     username: "Cityville",
  //     phone: "8899665533",
  //     role: "Student"
  //   },
  //   {
  //     id: 1,
  //     email: "abc@gmail.com",
  //     profileImage: "https://sapnokamatlab.co.in/wp-content/uploads/2023/08/Sher.webp",
  //     username: "Cityville",
  //     phone: "8899665533",
  //     role: "Student"
  //   },
  // ];
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
                    {/* <th>User</th> */}
                    <th>Profile Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Delete</th>
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
                        <button>
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
