import { useEffect } from 'react';
import { selectLoggedInUser, signOutAsync } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
    navigate("/signin")
  }, [dispatch, user]);

  // but useEffect runs after render, so we have to delay navigate part
  return (
    <>
    </>
  );
}

export default Logout;