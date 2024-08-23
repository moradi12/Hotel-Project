// src/Components/Redux/Customer/CustomerReducer.ts
import { CustomerModel } from "../../Models/CustomerModel";

export class CustomerState {
    customers: CustomerModel[] = []; // Example state property to hold customers
}

export enum CustomerActionType {
    CLEAR_CUSTOMER_STATE = "CLEAR_CUSTOMER_STATE",
    ADD_CUSTOMER = "ADD_CUSTOMER",
}

export interface CustomerAction {
    type: CustomerActionType;
    payload?: any;
}

// Action Creators
export function clearCustomerStateAction(): CustomerAction {
    return { type: CustomerActionType.CLEAR_CUSTOMER_STATE };
}

export function addCustomerAction(customer: CustomerModel[]): CustomerAction {
    return { type: CustomerActionType.ADD_CUSTOMER, payload: customer };
}

// Reducer
export function CustomerReducer(
    currentState: CustomerState = new CustomerState(),
    action: CustomerAction
): CustomerState {
    let newState = { ...currentState };

    switch (action.type) {
        case CustomerActionType.CLEAR_CUSTOMER_STATE:
            newState.customers = [];
            break;
        case CustomerActionType.ADD_CUSTOMER:
            newState.customers = action.payload;
            break;
    }

    return newState;
}
