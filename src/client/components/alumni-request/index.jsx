import React from 'react'
import { useGetter } from '../../hooks/fetcher';
import urls,{ basePath} from '../../../utils/urls';
import AluminiRequestCard from '../cards/AluminiRequestCard';

const AlumniRequest = () => {
    const {data: requestData, mutate:requestMutate} = useGetter(basePath+urls.request.alumniRequests)
  return (
    <div className='card' style={{width:"60%", margin:"0 auto", boxShadow: "1px 1px 20px 0px black"}}>
        {
        requestData?.data.length > 0 ? requestData?.data.map(req => <AluminiRequestCard requestMutate={requestMutate} cr={req} user={req.from} doc={req.document}></AluminiRequestCard>) :(<h3>No Alumni Requests</h3>)
        }
    </div>
  )
}

export default AlumniRequest