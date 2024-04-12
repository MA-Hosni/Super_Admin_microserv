import mongoose from "mongoose";

const GroupPermissionSchema = new mongoose.Schema({
    groupName: { 
        type: String, 
        required: true,
    },
    users: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Manager'
    }], // Array of references to users who belong to this group
    
    isCustom : { type: Boolean, default: true},

    //managers page
    viewAllManagers: { type: Boolean, default:  true},
    viewManagerDetails : { type: Boolean, default:   false},
    deleteManager : { type: Boolean, default:   false},
    addNewManager : { type: Boolean, default:   false},
    //managers page
    
    ////[manager] page
    editManagerDetails : { type: Boolean, default:   false},
    ////[manager] page

    //companies page
    viewAllCompanies: { type: Boolean, default:  true},
    viewCompanyDetails : { type: Boolean, default:   false},
    deleteCompany : { type: Boolean, default:   false},
    addNewCompany : { type: Boolean, default:   false},
    //companies page
    
    ////[companie] page
    editCompanyDetails : { type: Boolean, default:   false},
    ////[companie] page

    //pack page
    viewAllPackages: { type: Boolean, default:  true},
    viewPackageDetails : { type: Boolean, default:   false},
    deletePackage : { type: Boolean, default:   false},
    addNewPackage : { type: Boolean, default:   false},
    //pack page
    
    ////[pack] page
    editPackageDetails : { type: Boolean, default:   false},
    ////[pack] page

    //permission page
    viewAllPermissions: { type: Boolean, default:  true},
    viewPermissionDetails : { type: Boolean, default:   false},
    deletePermission : { type: Boolean, default:   false},
    addNewPermission : { type: Boolean, default:   false},
    //permission page
    
    ////[permission] page
    editPermissionDetails : { type: Boolean, default:   false},
    assignUsers : { type: Boolean, default:   false},
    ////[permission] page



    isDeleted : { type: Boolean, default:   false},
}, {
    timestamps: true,
});

const GroupPermission = mongoose.models.PermissionGroup || mongoose.model('PermissionGroup', GroupPermissionSchema);

export default GroupPermission;