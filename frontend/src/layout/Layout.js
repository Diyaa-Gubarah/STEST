import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppShallowSelector } from "../hooks/hooks";

import { Home } from "../routes/Home/Home";
import Login from "../routes/Login/Login";
import Register from "../routes/Register/Register";
import { initializeUser } from "../store/slice/userSlice";
import { useEffect } from "react";

function App({ children }) {
  const dispatch = useAppDispatch();
  const user = useAppShallowSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  return user ? (
    <Home>{children}</Home>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

const Layout = ({ children }) => {
  return <App children={children} />;
};

export default Layout;
