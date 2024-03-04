import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import urls, { basePath, serverPath } from '@utils/urls';
import { selectSession } from '../auth/authSlice';
import tempImage from '@client/assets/images/profile.png';
import { toast } from 'react-toastify';

const ReportedPostCard = (props) => {
  const session = useSelector(selectSession);

  const ignoreHandler = async () => {
    try {
      const res = await axios.delete(basePath + urls.report.deleteById.replace(':id', props?.report?._id), {
        headers: {
          authorization: `Bearer ${session.token}`,
        },
      });

      if (res?.status === 200) {
        props.mutate();
        toast.success('Ignored Reported Post Successfully');
      } else {
        toast.error('Something went wrong!!');
      }
    } catch (error) {
      console.error('Error ignoring reported post:', error);
      toast.error('An error occurred while ignoring reported post');
    }
  };

  const removeHandler = async () => {
    try {
      const res = await axios.delete(basePath + urls.post.delete.replace(':id', props?.report?._id), {
        headers: {
          authorization: `Bearer ${session.token}`,
        },
      });

      if (res?.status === 200) {
        props.mutate();
        toast.success('Removed Post Successfully');
      } else {
        toast.error('Something went wrong!!');
      }
    } catch (error) {
      console.error('Error removing reported post:', error);
      toast.error('An error occurred while removing reported post');
    }
  };

  return (
    <>
      <div className="reported-post">
        <Link to={`/post/${props?.report?._id}`}>
          <div className="postDetails">
            <div className="postImage">
              <img src={props?.report.post?.image ? serverPath + props?.report.post?.image : tempImage} alt="postImg" />
            </div>
            <div className="postInfo">
              <h5>{props?.report.post?.title}</h5>
              <p>{props?.report.post?.description}</p>
            </div>
          </div>
        </Link>
        <div className="postOptions">
          <button className="noborderButton" type="button" onClick={ignoreHandler}>
            Ignore
          </button>
          <button className="text-button" style={{ fontSize: '1rem' }} type="button" onClick={removeHandler}>
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportedPostCard;
