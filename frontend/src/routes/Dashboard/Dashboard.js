import "./Dashboard.css";

import { deleteACustomer, setError } from "../../store/slice/customerSlice";
import { useAppDispatch, useAppShallowSelector } from "../../hooks/hooks";

import Item from "../../components/Item/Item";
import Loading from "../../components/Loading/Loading";
import Notification from "../../components/Notification/Notification";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { useCallback } from "react";

const Dashboard = () => {
  const customers = useAppShallowSelector((state) => state.customer.customers);
  const isLoading = useAppShallowSelector((state) => state.customer.isLoading);

  const dispatch = useAppDispatch();

  const removeCustomer = useCallback((customerId) => {
    dispatch(deleteACustomer(customerId));
  }, []);

  return (
    <div className="dashboard">
      <Notification />
      <Loading loading={isLoading} />

      <ScreenHeader title="Dashboard" />
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Item customer={customer} remove={removeCustomer} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dashboard;
