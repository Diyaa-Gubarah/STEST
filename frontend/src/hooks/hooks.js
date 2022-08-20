import { shallowEqual, useDispatch, useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` 
export const useAppDispatch = () => {
  return useDispatch();
};

// Use throughout your app instead of plain `useSelector`
export const useAppShallowSelector = (selector) => {
  return useSelector(selector, shallowEqual);
};
