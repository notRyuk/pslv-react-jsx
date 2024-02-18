// import "./SearchResult.css";
import classes from "./styles.module.scss"
import profile from "@client/assets/images/profile.png";
import { serverPath } from "../../../utils/urls";
import { Link } from "react-router-dom";

export const SearchResult = ({ result, setSearchResults, setInput }) => {
    const handleClick = ()=>{
        setInput("");
        setSearchResults([]);
    }
    return (
        <Link to={`/profile/${result?._id}`}>
            <div
                className={classes.search}
                onClick = {handleClick}
            >
                <div className={classes.profilePhoto}>
                    <img src={result?.profilePhoto ? serverPath + result?.profilePhoto : profile} alt="profilePhoto" />
                </div>
                <div>
                    {result?.name?.first} {result?.name?.last}
                </div>
            </div>
        </Link>
    );
};