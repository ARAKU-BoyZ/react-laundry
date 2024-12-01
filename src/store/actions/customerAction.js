export const setCustomers = (customers) => ({
    type: "SET_CUSTOMERS",
    payload: { customers },
});

export const addCustomer = (customer) => ({
    type: "ADD_CUSTOMER",
    payload: { customer },
});

export const deleteCustomer = (id) => ({
    type: "DELETE_CUSTOMER",
    payload: { id },
});

export const updateCustomer = (customer) => ({
    type: "UPDATE_CUSTOMER",
    payload: { customer },
});