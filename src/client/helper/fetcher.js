import { useSelector } from "react-redux";
import { selectSession } from "../components/auth/authSlice";
import axios from "axios";

export const getter = async(url, token)=>{
    const res = await axios.get(url, {
        headers : {
            authorization: `Bearer ${token}`
        },
    })
    return res;
}

const fetcher = () => {
    const session = useSelector(selectSession)
  return (
    <></>
  )
}

export default fetcher