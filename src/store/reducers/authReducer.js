const DEFAULT_STATE = {
    authData: JSON.parse(localStorage.getItem("authData")) || null,
}

export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            // MEnyimpan authData ke localstorage
            localStorage.setItem("authData", JSON.stringify(action.payload.authData))
            return {...state, authData: action.payload.authData}
        case "LOGOUT" :
            // menghapus authData dari localstorage
            localStorage.removeItem("authData")
            return {...state, authData: null}
        default:
            return state
    }
}