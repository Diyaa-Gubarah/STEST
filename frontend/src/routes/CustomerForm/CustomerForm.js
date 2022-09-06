import "./CustomerForm.css";

import {
  createACustomer,
  updateACustomer,
} from "../../store/slice/customerSlice";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Notification from "../../components/Notification/Notification";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { useAppDispatch } from "../../hooks/hooks";

const CustomerForm = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const customer = location.state?.customer || null;

  const [data, setUser] = useState({
    name: customer?.name || "",
    gender: customer?.gender || "",
    role: customer?.role || "",
    number: customer?.number || "",
    id: customer?.id || "",
  });


  const onTextChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setUser({ ...data, [name]: value });
    },
    [data]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      data.id
        ? dispatch(updateACustomer(data))
        : dispatch(createACustomer(data));
    },
    [data]
  );

  return (
    <div className="customer__form">
      <Notification />

      <ScreenHeader title={data.id ? "Update Customer" : "Add Customer"} />

      <div className="customer__form-box">
        <form onSubmit={onSubmit}>
          <div className="customer__form-body">
            <div className="form__input">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type={"text"}
                id="name"
                value={data.name || ""}
                onChange={(e) => onTextChange(e)}
                maxLength={24}
              />
            </div>
            <div className="form__input">
              <label htmlFor="number">Number</label>
              <input
                name="number"
                type={"number"}
                id="number"
                value={data.number || ""}
                onChange={(e) => onTextChange(e)}
                maxLength={15}
              />
            </div>
            <div className="form__input">
              <label htmlFor="gender">Gender</label>
              <div className="form__radio-group">
                <div className="form__radio-group-item">
                  <input
                    defaultChecked={data.gender === "male"}
                    type="radio"
                    value="male"
                    name="gender"
                    onChange={(e) => onTextChange(e)}
                  />
                  <p>Male</p>
                </div>
                <div className="form__radio-group-item">
                  <input
                    defaultChecked={data.gender === "female"}
                    type="radio"
                    value="female"
                    name="gender"
                    onChange={(e) => onTextChange(e)}
                  />
                  <p>Female</p>
                </div>
              </div>
            </div>
            <div className="form__input">
              <label htmlFor="role">Role</label>
              <div className="form__radio-group">
                <div className="form__radio-group-item">
                  <input
                    defaultChecked={data.role === "client"}
                    type="radio"
                    value="client"
                    name="role"
                    onChange={(e) => onTextChange(e)}
                  />
                  <p>Client</p>
                </div>
                <div className="form__radio-group-item">
                  <input
                    defaultChecked={data.role === "supplier"}
                    type="radio"
                    value="supplier"
                    name="role"
                    onChange={(e) => onTextChange(e)}
                  />
                  <p>Supplier</p>
                </div>
              </div>
            </div>
          </div>

          <button className="continue" type="submit">
            {data.id ? "Update Customer" : "Add New Customer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
