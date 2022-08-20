import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppShallowSelector } from "../../hooks/hooks";

import { BiArrowBack } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import React from "react";

// import { logout } from "../../app/redux/user/userSlice";

const Navbar = () => {
  const { user } =
    {
      id: "",
      name: "Diyaa Guabarh",
      email: "diyaa.ahgah",
      password: "",
    } || useAppShallowSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar_container">
        <div className="navbar__input">
          <FiSearch />
          <input type="text" placeholder="Search Customer" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
