import { createSlice } from "@reduxjs/toolkit";
import customerServices from "../../services/customer";

const initialState = {
  customers: [],
  isLoading: false,
  message: null,
  success: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      return {
        ...state,
        customers: action.payload,
      };
    },
    createCustomer: (state, action) => {
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    },
    updateCustomer: (state, action) => {
      const customers = state.customers.map((c) => {
        if (c.id === action.payload.id) {
          return action.payload;
        }
        return c;
      });
      return {
        ...state,
        customers: [...customers],
      };
    },
    deleteCustomer: (state, action) => {
      return {
        ...state,
        customers: [...state.customers.filter((c) => c.id !== action.payload)],
      };
    },
    setIsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setMessage: (state, action) => {
      return {
        ...state,
        message: action.payload.message,
        success: action.payload.success,
      };
    },
  },
});

export const {
  setCustomers,
  updateCustomer,
  deleteCustomer,
  setIsLoading,
  createCustomer,
  setMessage,
} = customerSlice.actions;
export default customerSlice.reducer;

export const initializeCustomer = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const customers = await customerServices.getCustomers();
      dispatch(setCustomers(customers));
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

export const createACustomer = (customer) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const newCustomer = await customerServices.createCustomer(customer);
      dispatch(
        setMessage({
          message: "Customer created successfully",
          success: true,
        })
      );
      dispatch(createCustomer(newCustomer));
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

export const updateACustomer = (customer) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(
      setMessage({
        message: null,
        success: false,
      })
    );

    try {
      const updatedCustomer = await customerServices.updateCustomer(
        customer.id,
        customer
      );
      dispatch(updateCustomer(updatedCustomer));
      dispatch(
        setMessage({
          message: "Customer updated successfully",
          success: true,
        })
      );
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

export const deleteACustomer = (customerId) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(
      setMessage({
        message: null,
        success: false,
      })
    );

    try {
      await customerServices.deleteCustomer(customerId);
      dispatch(deleteCustomer(customerId));
      dispatch(
        setMessage({
          message: "Customer deleted successfully",
          success: true,
        })
      );
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
