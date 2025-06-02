import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import { Provider } from "react-redux";
import { store } from "./store/redux";
import { useContext, useEffect } from "react";
import getUserInfo from "./Services/User";
import { RootState } from "@/store/redux";
import { setUser } from "@/store/slices/userSlice";
import User from "./models/User";
import { useDispatch } from "react-redux";
import AuthContext from "./contexts/authContext";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      console.log(userInfo);
      dispatch(setUser(userInfo));
    };
    fetchUserInfo();
  }, [dispatch]);
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
