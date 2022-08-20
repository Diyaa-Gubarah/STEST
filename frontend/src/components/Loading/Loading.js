import "./Loading.css";

import { useAppDispatch, useAppShallowSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";

import { setMessage } from "../../store/slice/customerSlice";

const Loading = ({ loading }) => {
  return loading && <div className="loading">Loading...</div>;
};

export default Loading;
