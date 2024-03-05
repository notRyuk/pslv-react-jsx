// @ts-ignore
// import classes from "./styles.module.scss"
import { useState } from "react";
import urls, { basePath } from "../../../utils/urls";
import { Link } from "react-router-dom";
import { usePoster } from "../../hooks/fetcher";
import { toast } from "react-toastify";

const ReportPostButton = ({ post }) => {
  const reportUrl = basePath + urls.reportedPost.create;
  const [reason, setReason] = useState("");

  const { data: reportedData, trigger: reportPost } = usePoster(reportUrl);

  const clickHandler = async () => {
    try {
      const res = await reportPost({
        post: post,
        reason: reason,
      });

      if (res?.status === "success") {
        toast.success("Reported Post Successfully");
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error while reporting post:", error);
      toast.error("Failed to report post. Please try again later.");
    }
  };

  return (
    <>
      <Link data-bs-toggle="modal" data-bs-target="#reportModal">
        <i className="fa-regular fa-newspaper"></i> Report
      </Link>

      <div
        className="modal fade mt-5"
        id="reportModal"
        tabIndex="-1"
        aria-labelledby="reportModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content" style={{ backgroundColor: "rgb(27, 39, 48)" }}>
            <div className="modal-header pb-0" style={{ color: "#fff" }}>
              <p className="modal-title" id="exampleModalLabel">
                <h4 className="mb-3" style={{fontWeight:"600"}}>Report Content</h4>
                <h6>Reason of Report</h6>
              </p>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ color: "#fff" }}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="content.text"
                  rows="6"
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>
              <button
                type="button"
                className="btn submitButton"
                data-bs-dismiss="modal"
                style={{ width: "100%" }}
                onClick={clickHandler}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPostButton;
