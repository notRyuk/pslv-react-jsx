import React from "react";
import "./style.css";
import Footer from "../../components/footer";

const Index = ({ users }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70% 20%",
        marginTop: "5%",
      }}
    >
      <div className="container mt-4">
        <section className="main mt-4">
          <div className="main-top">
            <h1
              style={{
                color: "White",
              }}
            >
              Users
            </h1>
          </div>
          <section className="attendance">
            <div className="attendance-list">
              <table className="tablebg">
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Profile Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        {" "}
                        <span className="profileImg">
                          <img src={user.profileImage} alt="Profile" />
                        </span>
                      </td>
                      <td>{user.username}</td>
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
      <Footer />
    </div>
  );
};

export default Index;
