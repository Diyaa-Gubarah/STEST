import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Analytics from "./routes/Analytics/Analytics";
import CustomerForm from "./routes/CustomerForm/CustomerForm";
import Customers from "./routes/Customers/Customers";
import Dashboard from "./routes/Dashboard/Dashboard";
import Layout from "./layout/Layout";
import Login from "./routes/Login/Login";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import Register from "./routes/Register/Register";
import Setting from "./routes/Settings/Settings";
import SingleCustomer from "./routes/SingleCustomer/SingleCustomer";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:customerId" element={<SingleCustomer />} />
            <Route path="customers/new" element={<CustomerForm />} />
            <Route path="/analytic" element={<Analytics />} />
            <Route path="/settings" element={<Setting />} />

            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Page Not Found</p>
                </main>
              }
            />
          </Routes>
        </Layout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
