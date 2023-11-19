import { useEffect } from 'react';
import { selectLoggedInUser, signOutAsync } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  }, [dispatch]);

  // but useEffect runs after render, so we have to delay navigate part
  return <>
    {console.log(user)}
    {user === null && <Navigate to="/signin" replace={true}></Navigate>}
  </>;
}

export default Logout;