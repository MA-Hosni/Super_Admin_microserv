import toast from "react-hot-toast"

export const validateManager = (fname:string, lname:string, email:string, password:string, matricule:string, phone:string, cin:string, birth:string, address:string) => {
    const emailPattern = /\S+@\S+\.\S+$/;
    const mdpPattern = /^(?=.*\d)(?=.*[?!@#$%^&*,;:./<>+-|])(?=.*[A-Z]).{8,}$/;
    const eightPattern = /^\d{8}$/;
    const sixPattern = /^\d{6}$/;
    
    if(fname === "" || fname.trim() === "") {
        toast.error("First name cannot be empty");
        return false;
    } else if(lname === "" || lname.trim() === "") {
        toast.error("Last name cannot be empty");
        return false;
    }else if(email === "" || email.trim() === "") {
        toast.error("Email required");
        return false;
    }else if(emailPattern.test(email) === false){
        toast.error("Email invalid");
        return false;
    }else if(password === "" || password.trim() === "") {
        toast.error("Password required");
        return false;
    }else if(password.length <= 8){
        toast.error("password must be at least 8 characters");
        return false;
    }else if(mdpPattern.test(password) === false){
        toast.error("password must contain at least:\n One uppercase letter\n One special character(?!@#$%^&*,;:./<>+-|)\n One digit");
        return false;
    }else if(matricule === "" || matricule.trim() === "") {
        toast.error("Manager ID cannot be empty");
        return false;
    }else if(matricule.length !== 6 || sixPattern.test(matricule) === false){
        toast.error("Manager ID must be 6 digits");
        return false;
    }else if(phone === "" || fname.trim() === "") {
        toast.error("Phone number cannot be empty");
        return false;
    }else if(phone.length !== 8 || eightPattern.test(phone) === false){
        toast.error("Phone number must be 8 digits");
        return false;
    }else if(cin === "" || fname.trim() === "") {
        toast.error("ID card number is required");
        return false;
    }else if(cin.length !== 8 || eightPattern.test(cin) === false){
        toast.error("ID must be 8 digits");
        return false;
    }else if(birth === "" || birth.trim() === "") {
        toast.error("Date of birth required");
        return false;
    }else if(address === "" || address.trim() === "") {
        toast.error("Address required");
        return false;
    } else {
        return true;
    }
}