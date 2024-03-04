import React from 'react'
import { useGetter } from '../../hooks/fetcher';
import urls,{ basePath} from '../../../utils/urls';
import ReportedUserCard from '../cards/ReportedUserCard';

const ReportedUser = () => {
  const {data: reportedUserData, mutate: reportedUserMutate} = useGetter(basePath + urls.report.getAll)

  return (
    <div className='card' style={{width:"60%", margin:"0 auto", boxShadow: "1px 1px 20px 0px black"}}>
        {console.log(reportedUserData?.data)}
      {reportedUserData?.data?.length > 0 ? reportedUserData?.data.map((report, ind)=> <ReportedUserCard key={ind} report={report} mutate={reportedUserMutate}/>) : <h3>No Reported User Found!!</h3>}
    </div>
  )
}

export default ReportedUser