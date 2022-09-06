import "./SideMenu.css";

import {
  TbLayoutDashboard,
  TbPower,
  TbReportAnalytics,
  TbSettings,
  TbUsers,
} from "react-icons/tb";
import { loginAUser, logout } from "../../store/slice/userSlice";
import { useAppDispatch, useAppShallowSelector } from "../../hooks/hooks";

import CustomLink from "../CustomLink/CustomLink";
import { MdAddCircle } from "react-icons/md";
import React from "react";

function SideMenu() {
  const dispatch = useAppDispatch();
  const user = useAppShallowSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="sideMenu">
      <div className="navigation">
        <ul>
          {user && (
            <div className="navigation-img">
              <small>{user?.name[0].toUpperCase()}</small>
            </div>
          )}
          <CustomLink to="/">
            <li className="navIcon">
              <TbLayoutDashboard />
            </li>
          </CustomLink>
          <CustomLink to="/customers">
            <li className="navIcon">
              <TbUsers />
            </li>
          </CustomLink>
          <CustomLink to="/customer/6">
            <li className="navIcon">
              <TbReportAnalytics />
            </li>
          </CustomLink>
        </ul>
      </div>
      <div className="navigation">
        <ul>
          <CustomLink to="/customers/new">
            <li className="navIcon">
              <MdAddCircle />
            </li>
          </CustomLink>
          <CustomLink to="/settings">
            <li className="navIcon">
              <TbSettings />
            </li>
          </CustomLink>
          <CustomLink to={""}>
            <li className="navIcon ">
              <TbPower onClick={handleLogout} />
            </li>
          </CustomLink>
        </ul>
      </div>
    </div>
  );
}

export default React.memo(SideMenu);
