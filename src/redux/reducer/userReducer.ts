// Define the initial state type
interface InitialState {
    firstName: string,
    lastName: string,
    profilePhoto: string,
}

// Define the initial state
const initialState: InitialState = {
    firstName: "",
    lastName: "",
    profilePhoto: "",
};

// Define the action types
interface SetUserAction {
    type: "SET_USER";
    payload: any; // Adjust the type according to your payload data type
}

// Define the union type for all actions
type UserActionTypes = SetUserAction;

// Define the reducer function
const userReducer = (state: InitialState = initialState, action: UserActionTypes): InitialState => {
    switch (action.type) {
        case "SET_USER":
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;