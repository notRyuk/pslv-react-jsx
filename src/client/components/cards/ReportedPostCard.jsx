import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import urls, { basePath, serverPath } from "@utils/urls";
import { selectSession } from "../auth/authSlice";
// @ts-ignore
import tempImage from "@client/assets/images/profile.png";
import { toast } from "react-toastify";

const ReportedPostCard = (props) => {
  
  const session = useSelector(selectSession);

  const ignoreHandler = async () => {
    try {
      const res = await axios.delete(
        basePath +
          urls.reportedPost.deleteById.replace(":id", props?.report?.post?._id),
        {
          headers: {
            authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (res?.status === 200) {
        props.mutate();
        toast.success("Ignored Reported Post Successfully");
        return true;
      } else {
        toast.error("Something went wrong!!");
        return false;
      }
    } catch (error) {
      console.error("Error ignoring reported post:", error);
      toast.error("An error occurred while ignoring reported post");
      return false;
    }
  };
  // console.log(props);

  const removeHandler = async () => {
    try {
      const res1 = await axios.delete(
        basePath + urls.post.delete.replace(":id", props?.report?.post?._id),
        {
          headers: {
            authorization: `Bearer ${session.token}`,
          },
        }
      );

      const res2 = await axios.delete(
        basePath +
          urls.reportedPost.deleteById.replace(":id", props?.report?.post?._id),
        {
          headers: {
            authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (res1?.status === 200 && res2?.status === 200) {
        props.mutate();
        toast.success("Removed Post Successfully");
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error removing reported post:", error);
      toast.error("An error occurred while removing reported post");
    }
  };

  return (
    <>
      <div className="reported-post">
        <div className="row">
          <div className="col"></div>
        </div>
        <Link to={`/post/${props?.report?._id}`}>
          <div className="postDetails">
            <div className="postImage">
              <img
                src={
                  props?.report.post?.image
                    ? serverPath + props?.report.post?.image
                    : tempImage
                }
                alt="postImg"
              />
            </div>
            <div className="postInfo">
              <h5>{props?.report.post?.title}</h5>
              <p>{props?.report.post?.description}</p>
            </div>
          </div>
        </Link>

        <div className="postOptions">
          <button
            className="noborderButton"
            type="button"
            onClick={ignoreHandler}
          >
            Ignore
          </button>
          <button
            className="text-button"
            style={{ fontSize: "1rem" }}
            type="button"
            onClick={removeHandler}
          >
            Delete Post
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportedPostCard;
