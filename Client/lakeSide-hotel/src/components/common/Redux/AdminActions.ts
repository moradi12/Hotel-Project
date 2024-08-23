import { AdminActionType } from "./AdminReducer";

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
