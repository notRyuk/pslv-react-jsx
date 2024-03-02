// import "./SearchResult.css";
import classes from "./styles.module.scss"
import profile from "@client/assets/images/profile.png";
import { serverPath } from "../../../utils/urls";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const SearchResult = ({ result, setSearchResults, setInput, setBlur }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => {
        if(location.pathname !== "/jobs"){
            if(location.pathname.includes('/chat')){
                navigate(`/chat?userId=${result?._id}`)
            }
            else navigate(`/profile/${result?._id}`)
        }
        setInput("");
        setSearchResults([]);
        setBlur(true)
    }
    return (
        <div
            className={classes.search}
            onClick={handleClick}
        >
            {
                location.pathname !== "/jobs" ? <>
                    <div className={classes.profilePhoto}>
                        <img src={result?.profilePhoto ? serverPath + result?.profilePhoto : profile} alt="profilePhoto" />
                    </div>
                    <div>
                        {result?.name?.first} {result?.name?.last}
                    </div>
                </> : <div>
                    {result?.title}
                </div>
            }
        </div>
    );
};