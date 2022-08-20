import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import {
  loginAUser,
  setMessage
} from "../../store/slice/userSlice";
import { useAppDispatch, useAppShallowSelector } from "../../hooks/hooks";
import { useCallback, useEffect, useState } from "react";

// import { login } from "../../app/redux/user/userSlice";

const Login = () => {
  const isLoading = useAppShallowSelector((state) => state.user.isLoading);
  const message = useAppShallowSelector((state) => state.user.message);
  const success = useAppShallowSelector((state) => state.user.success);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onTextChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setUser({ ...user, [name]: value });
    },
    [user]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      dispatch(loginAUser(user));
    },
    [user, isLoading, navigate]
  );

  useEffect(() => {
    if (message) {
      dispatch(
        setMessage({
          message: "",
          success: false,
        })
      );
    }
  }, [success, navigate]);

  return (
    <div className="login">
      <div className="login__box">
        <h1>Login</h1>

        <form onSubmit={onSubmit}>
          <div className="form__input">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type={"text"}
              value={user.username || ""}
              onChange={(e) => onTextChange(e)}
            />
          </div>
          <div className="form__input">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type={"password"}
              value={user.password || ""}
              onChange={(e) => onTextChange(e)}
            />
          </div>
          <button className="continue" type="submit">
            {isLoading ? "Loading...." : "Login"}
          </button>
          {message && <span className="login__err">{message}</span>}

          <Link className="link__btn" to={"/register"}>
            <span>You don't have an account? Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
