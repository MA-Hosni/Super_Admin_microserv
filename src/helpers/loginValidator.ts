import toast from "react-hot-toast"

export const validatelogin = (email:string, password:string) => {
   const emailPattern = /\S+@\S+\.\S+$/;
if(email === "" || email.trim() === "") {
        toast.error("Email required");
        return false;
    }else if(emailPattern.test(email) === false){
        toast.error("Email invalid");
        return false;
    }else if(password === "" || password.trim() === "") {
        toast.error("Password required");
        return false;
    } else {
        return true;
    }
}