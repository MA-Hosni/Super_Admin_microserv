import toast from "react-hot-toast"

export const validateReset = (password:string) => {
 
const mdpPattern = /^(?=.*\d)(?=.*[?!@#$%^&*,;:./<>+-|])(?=.*[A-Z]).{8,}$/;

if(password === "" || password.trim() === "") {
        toast.error("Password required");
        return false;
    } else if(password.length <= 8){
        toast.error("password must be at least 8 characters");
        return false;
    }else if(mdpPattern.test(password) === false){
        toast.error("password must contain at least:\n One uppercase letter\n One special character(?!@#$%^&*,;:./<>+-|)\n One digit");
        return false;
    } else {
        return true;
    }
}