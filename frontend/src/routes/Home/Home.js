import "./Home.css";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import { initializeCustomer } from "../../store/slice/customerSlice";
import { initializeUser } from "../../store/slice/userSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { useEffect } from "react";

export function Home(props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeUser());

    dispatch(initializeCustomer());
  }, []);
  

  return (
    <div className="wrapper">
      <div className="sidebar">
        <SideMenu />
      </div>
      <div className="main">
        <div className="nav">
          <Navbar />
        </div>
        <div className="content">{props.children}</div>
        <Footer />
      </div>
    </div>
  );
}
