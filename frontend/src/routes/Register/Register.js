import "./Register.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { registerAUser, setMessage } from "../../store/slice/userSlice";
import { useAppDispatch, useAppShallowSelector } from "../../hooks/hooks";
import { useCallback, useEffect, useState } from "react";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const isLoading = useAppShallowSelector((state) => state.user.isLoading);
  const message = useAppShallowSelector((state) => state.user.message);
  const success = useAppShallowSelector((state) => state.user.success);
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });

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

      dispatch(registerAUser(user));
    },
    [user, isLoading, navigate]
  );

  useEffect(() => {
    if (success) {
      navigate("/login", { replace: true, });
      dispatch(
        setMessage({
          message: "",
          success: false,
        })
      );
    }
    [success, navigate];
  });

  return (
    <div className="login">
      <div className="login__box">
        <h1>Create new account</h1>

        <form onSubmit={onSubmit}>
          <div className="form__input">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type={"text"}
              value={user.name || ""}
              onChange={(e) => onTextChange(e)}
            />
          </div>
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
              id="password"
              value={user.password || ""}
              onChange={(e) => onTextChange(e)}
            />
          </div>
          <button className="continue" type="submit">
            {isLoading ? "Loading...." : "Register"}
          </button>
          {message && <span className="login__err">{message}</span>}

          <Link className="link__btn" to={"/login"}>
            <span>You already have an account? Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
