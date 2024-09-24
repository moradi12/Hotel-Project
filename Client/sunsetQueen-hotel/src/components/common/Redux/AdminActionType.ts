export enum AdminActionType {
  addCustomer = "ADD_CUSTOMER",
  deleteCustomer = "DELETE_CUSTOMER",
  updateCustomer = "UPDATE_CUSTOMER",
  getCustomerList = "GET_CUSTOMER_LIST",
}

export const addCustomerAction = (customerData: any) => ({
  type: AdminActionType.addCustomer,
  payload: customerData,
});

export const deleteCustomerAction = (customerId: number) => ({
  type: AdminActionType.deleteCustomer,
  payload: customerId,
});

export const updateCustomerAction = (customerData: any) => ({
  type: AdminActionType.updateCustomer,
  payload: customerData,
});

export const getCustomerListAction = () => ({
  type: AdminActionType.getCustomerList,
});

export interface AdminState {
  customers: any[];
}

const initialState: AdminState = {
  customers: [],
};

export function AdminReducer(
  state: AdminState = initialState,
  action: { type: AdminActionType; payload?: any }
): AdminState {
  switch (action.type) {
    case AdminActionType.addCustomer:
      return { ...state, customers: [...state.customers, action.payload] };
    case AdminActionType.deleteCustomer:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    case AdminActionType.updateCustomer:
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
      };
    case AdminActionType.getCustomerList:
      return state;
    default:
      return state;
  }
}
