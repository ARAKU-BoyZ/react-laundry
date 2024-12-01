export const login = (authData) => ({
    type: "LOGIN",
    payload: {authData}
})

export const logout = () => ({
    type: "LOGOUT",
    payload: null
})