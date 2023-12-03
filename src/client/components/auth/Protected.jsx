import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from './authSlice';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";


function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);
  const loc = useLocation()
  const freePaths = [
    "/",
    "/signin",
    "/signup"
  ]
  if (freePaths.includes(loc.pathname)) {
    return children
  }
  if (!user) {
    return <Navigate to="/signin" replace={true} />;
  }
  return children;
}

export default Protected;