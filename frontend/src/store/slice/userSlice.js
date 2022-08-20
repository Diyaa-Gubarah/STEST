import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../utils/helper";

import { createSlice } from "@reduxjs/toolkit";
import userServices from "../../services/user";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  success: false,
  message: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },

    setIsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    setMessage: (state, action) => {
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
      };
    },
  },
});

export default userSlice.reducer;
export const { setUser, setIsLoading, setError, setMessage } =
  userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    setMessage({
      message: null,
      success: false,
    });
    try {
      const user = (await getFromLocalStorage("user")) || null;
      dispatch(setUser(user));
    } catch (error) {
      dispatch(
        setMessage({
          message: error.response
            ? error.response.data.error
            : "Something went wrong",
          success: false,
        })
      );
    }
    dispatch(setIsLoading(false));
  };
};

export const loginAUser = (user) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(
      setMessage({
        message: null,
        success: false,
      })
    );

    try {
      const response = await userServices.login(user);
      await removeFromLocalStorage("user");
      await setToLocalStorage("user", response);
      dispatch(setUser(JSON.stringify(response)));
    } catch (error) {
      dispatch(
        setMessage({
          message: error.response
            ? error.response.data.error
            : "Something went wrong",
          success: false,
        })
      );
    }
    dispatch(setIsLoading(false));
  };
};

export const registerAUser = (user) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(
      setMessage({
        message: null,
        success: false,
      })
    );

    try {
      await userServices.signup(JSON.stringify(user));
      dispatch(setMessage({ message: null, success: true }));
    } catch (error) {
      dispatch(
        setMessage({
          message: error.response
            ? error.response.data.error
            : "Something went wrong",
          success: false,
        })
      );
    }
    dispatch(setIsLoading(false));
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(
      setMessage({
        message: null,
        success: false,
      })
    );
    try {
      await removeFromLocalStorage("user");
      dispatch(setUser(null));
    } catch (error) {
      dispatch(
        setMessage({
          message: error.response
            ? error.response.data.error
            : "Something went wrong",
          success: false,
        })
      );
    }
    dispatch(setIsLoading(false));
  };
};
