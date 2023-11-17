import { useLocation, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Page() {
    const params = useParams()
    const location = useLocation()
    console.log(location)
    console.log(params)
    return <>Head && <Link to="/">Index page</Link></>
}

// /test/:id