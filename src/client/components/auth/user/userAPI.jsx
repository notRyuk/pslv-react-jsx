import urls, { basePath } from "@utils/urls"
import axios from "axios"

export function fetchUserById(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/users/'+userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  const session = JSON.parse(localStorage.getItem("session")) || null
  return new Promise(async (resolve) => {
    const response = await axios.post(basePath+urls.auth.verify, null, {
      headers: {
        authorization: `Bearer ${session?.token}`
      }
    }).then(res => res.data).then(resolve)
  });
}

export function fetchAllUsers() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/users');

    const data = await response.json();
    resolve({ data });
  });
}