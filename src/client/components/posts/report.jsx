// @ts-ignore
// import classes from "./styles.module.scss"
import urls, { basePath } from "../../../utils/urls";
import { usePoster } from "../../hooks/fetcher";
import { toast } from "react-toastify";

const ReportPostButton = ({ post }) => {
  const reportUrl = basePath + urls.reportedPost.create;

  const { data: reportedData, trigger: reportPost } = usePoster(reportUrl);

  const clickHandler = async () => {
    try {
      const res = await reportPost({
        post: post,
        reason: "This is the test reason",
      });
      console.log(res);
      if (res?.status === "success") {
        //   mutate();
        toast.success("Reported User Successfully");
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error while reporting post:", error);
      toast.error("Failed to report post. Please try again later.");
    }
  };

  return <button onClick={clickHandler}>Report</button>;
};

export default ReportPostButton;
