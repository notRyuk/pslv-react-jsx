import { TabPanel } from "@mui/lab"
import { useSelector } from "react-redux"
import { selectLoggedInUser } from "@client/components/auth/authSlice"

export default function Page() {
    const user = useSelector(selectLoggedInUser)
    console.log(user)
    return (
        <></>
    )
}

export const layout = {
    hashHeader: false
}