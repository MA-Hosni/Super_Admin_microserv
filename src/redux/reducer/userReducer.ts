// Define the initial state type
interface InitialState {
    firstName: string,
    lastName: string,
    profilePhoto: string,
    groupName: string,
    viewAllManagers: boolean,
    viewManagerDetails: boolean,
    deleteManager: boolean,
    addNewManager: boolean,
    editManagerDetails: boolean,
    viewAllCompanies: boolean,
    viewCompanyDetails: boolean,
    deleteCompany: boolean,
    addNewCompany: boolean,
    editCompanyDetails: boolean,
    viewAllPackages: boolean,
    viewPackageDetails: boolean,
    deletePackage: boolean,
    addNewPackage: boolean,
    editPackageDetails: boolean,
    viewAllPermissions: boolean,
    viewPermissionDetails: boolean,
    deletePermission: boolean,
    addNewPermission: boolean,
    editPermissionDetails: boolean,
    assignUsers: boolean,
}

// Define the initial state
const initialState: InitialState = {
    firstName: "",
    lastName: "",
    profilePhoto: "",
    groupName: "",
    viewAllManagers: false,
    viewManagerDetails: false,
    deleteManager: false,
    addNewManager: false,
    editManagerDetails: false,
    viewAllCompanies: false,
    viewCompanyDetails: false,
    deleteCompany: false,
    addNewCompany: false,
    editCompanyDetails: false,
    viewAllPackages: false,
    viewPackageDetails: false,
    deletePackage: false,
    addNewPackage: false,
    editPackageDetails: false,
    viewAllPermissions: false,
    viewPermissionDetails: false,
    deletePermission: false,
    addNewPermission: false,
    editPermissionDetails: false,
    assignUsers: false,
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