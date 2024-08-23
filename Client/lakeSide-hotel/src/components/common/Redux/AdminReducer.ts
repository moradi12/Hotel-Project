export class AdminReducer {
    public adminReducer: AdminReducer[] = [];
}

export enum AdminActionType {
    addCustomer = "ADD_CUSTOMER",
    deleteCustomer = "DELETE_CUSTOMER",
    updateCustomer = "UPDATE_CUSTOMER",
    getCustomerList = "GET_CUSTOMER_LIST"
}
