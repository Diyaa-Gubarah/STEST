import "./Notification.css";

import { useAppDispatch, useAppShallowSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";

import { setMessage } from "../../store/slice/customerSlice";

const Notification = () => {
  const dispatch = useAppDispatch();
  const message = useAppShallowSelector((state) => state.customer.message);
  const success = useAppShallowSelector((state) => state.customer.success);

  useEffect(() => {
    return () => {
      dispatch(
        setMessage({
          message: null,
          success: false,
        })
      );
    };
  }, []);

  const style = {
    ...(success
      ? {
          backgroundColor: "rgba(36, 212, 139, 0.2)",
          color: "#24D48B",
        }
      : { backgroundColor: "rgba(215, 108, 110, 0.2)", color: "#D76C6E" }),
  };

  return (
    message && (
      <div className="notification" style={style}>
        {message}
      </div>
    )
  );
};

export default Notification;
