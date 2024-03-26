import toast from "react-hot-toast"

export const validateChangePassword = (oldPassword:string, newPassword:string, confirmNewPassword:string) => {
    const mdpPattern = /^(?=.*\d)(?=.*[?!@#$%^&*,;:./<>+-|])(?=.*[A-Z]).{8,}$/;
    
    if(oldPassword === "" || oldPassword.trim() === "") {
        toast.error("Old password required");
        return false;
    } else if(oldPassword.length <= 8){
        toast.error("Old password must be at least 8 characters");
        return false;
    }else if(mdpPattern.test(oldPassword) === false){
        toast.error("Old password must contain at least:\n One uppercase letter\n One special character(?!@#$%^&*,;:./<>+-|)\n One digit");
        return false;
    }else if(newPassword === "" || newPassword.trim() === "") {
        toast.error("New password required");
        return false;
    } else if(newPassword.length <= 8){
        toast.error("New password must be at least 8 characters");
        return false;
    }else if(mdpPattern.test(newPassword) === false){
        toast.error("New password must contain at least:\n One uppercase letter\n One special character(?!@#$%^&*,;:./<>+-|)\n One digit");
        return false;
    }else if(confirmNewPassword === "" || confirmNewPassword.trim() === "") {
        toast.error("Confirm new password required");
        return false;
    }else if (newPassword !== confirmNewPassword){
        toast.error("New password and Confirm new password must be the same");
        return false;
    } else {
        return true;
    }
}