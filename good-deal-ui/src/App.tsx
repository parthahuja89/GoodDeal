import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import {useEffect } from "react";
import getUserInfo from "./Services/User";
import { setUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      dispatch(setUser(userInfo));
    };
    fetchUserInfo();
  }, [dispatch]);

  //disabling logging in production
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
    console.warn = () => {};
  }
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
