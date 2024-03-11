import toast from "react-hot-toast"

export const validateForgotPassword = (email:string) => {
    const emailPattern = /\S+@\S+\.\S+$/;
    
if(email === "" || email.trim() === "") {
        toast.error("Email required");
        return false;
    }else if(emailPattern.test(email) === false){
        toast.error("Email invalid");
        return false;
    } else {
        return true;
    }
}