// Define the initial state type
interface InitialState {
    packages: { id: string, isActive: boolean }[];
}

// Define the initial state
const initialState: InitialState = {
    packages: [],
};

// Define the action types
interface SetPackageAction {
    type: "SET_PACK";
    payload: { id: string, isActive: boolean }[]; // Payload is an array of objects containing id and isActive
}

// Define the union type for all actions
type PackageActionTypes = SetPackageAction;

// Define the reducer function
const packReducer = (state: InitialState = initialState, action: PackageActionTypes): InitialState => {
    switch (action.type) {
        case "SET_PACK":
            return {
                ...state,
                packages: action.payload,
            };
        default:
            return state;
    }
};

export default packReducer;
