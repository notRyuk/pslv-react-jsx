import React from 'react';
import { useGetter } from '../../hooks/fetcher';
import urls, { basePath } from '../../../utils/urls';
import ReportedPostCard from '../cards/ReportedPostCard';

const ReportedPost = () => {
  const { data: reportedPostData, mutate: reportedPostMutate } = useGetter(basePath + urls.reportedPost.getAll);

  return (
    <div className='card' style={{ width: "60%", margin: "0 auto", boxShadow: "1px 1px 20px 0px black" }}>
      {console.log(reportedPostData?.data)}
      {reportedPostData?.data?.length > 0 ? reportedPostData?.data.map((report, ind) => <ReportedPostCard key={ind} report={report} mutate={reportedPostMutate} />) : <h3>No Reported Post Found!!</h3>}
    </div>
  );
};

export default ReportedPost;
