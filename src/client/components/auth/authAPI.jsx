import urls, { basePath } from "@utils/urls";
import axios from "axios";


export async function createUser(userData) {
  return new Promise(async (resolve) => {
    const res = await axios.post(basePath + urls.auth.register, userData, {
      headers: {
        "Content-Type": "multiipart/form-data"
      }
    }).then(res => res.data).catch(err => err.response?.data || err.request)
    return (res?.status == "success" ? resolve(res) : reject(res))
  });
}




export async function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;

    const res = await axios.post(basePath + urls.auth.login, {
      email,
      password
    }).then(res => res.data).catch(err => err.response?.data || err.request)
    return (res?.status == "success" ? resolve(res) : reject(res))
  });
}


export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}