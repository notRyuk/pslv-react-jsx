import React from "react";
import UpdateByAdmin from "../../components/updateByAdmin";

const Index = () => {
  // Demo data for users, alumnis, csrfToken, and allJobs
  const users = [
    {
      id: 1,
      email: "abc@gmail.com",
      profileImage: "https://sapnokamatlab.co.in/wp-content/uploads/2023/08/Sher.webp",
      username: "Cityville",
      phone: "8899665533",
      role:"Student"
    },
    {
      id: 2,
      email: "def@gmail.com",
      profileImage: "",
      username: "John Doe",
      phone: "9090907676",
      role:"Student"
    },
    {
      id: 3,
      email: "kkl@gmail.com",
      profileImage: "",
      username: "Jane Doe",
      phone: "8798554433",
      role:"Student"
    },
    {
      id: 4,
      email: "llo@gmail.com",
      profileImage: "",
      username: "Ram Laal",
      phone: "0985798349",
      role:"Alumni"
    },
    {
      id: 5,
      email: "pll@gmail.com",
      profileImage: "",
      username: "Cityville",
      phone: "6755443338",
      role:"Alumni"
    },
    {
      id: 6,
      email: "kjg@gmail.com",
      profileImage: "",
      username: "Cityville",
      phone: "9087664325",
      role:"Alumni"
    },
    
  ];

  return <UpdateByAdmin users={users} />;
};

export default Index;
