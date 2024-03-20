import toast from "react-hot-toast"

export const validateCompany = (cname:string, indus:string, caddress:string, city:string, zipcode:string, country:string, pack:string,
    fname:string, lname:string, email:string, password:string, phone:string, cin:string, role:string) => {
    const emailPattern = /\S+@\S+\.\S+$/;
    const mdpPattern = /^(?=.*\d)(?=.*[?!@#$%^&*,;:./<>+-|])(?=.*[A-Z]).{8,}$/;
    const eightPattern = /^\d{8}$/;
    const fourPattern = /^\d{4}$/;
    
    if(cname === "" || cname.trim() === "") {
        toast.error("Company name cannot be empty");
        return false;
    } else if(indus === "" || indus.trim() === "") {
        toast.error("Choose an industry, it is required");
        return false;
    } else if(caddress === "" || caddress.trim() === "") {
        toast.error("Company address cannot be empty");
        return false;
    }else if(city === "" || city.trim() === "") {
        toast.error("City field cannot be empty");
        return false;
    }else if(zipcode === "" || zipcode.trim() === "") {
        toast.error("Zip Code required");
        return false;
    }else if(zipcode.length !== 4 || fourPattern.test(zipcode) === false){
        toast.error("Zip Code must be 4 digits");
        return false;
    }else if(country === "" || country.trim() === "") {
        toast.error("Country cannot be empty");
        return false;
    }else if(pack === "" || pack.trim() === "") {
        toast.error("Choose a pring plan, it is required");
        return false;
    } else if(fname === "" || fname.trim() === "") {
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
    }else if(phone === "" || phone.trim() === "") {
        toast.error("Phone number cannot be empty");
        return false;
    }else if(phone.length !== 8 || eightPattern.test(phone) === false){
        toast.error("Phone number must be 8 digits");
        return false;
    }else if(cin === "" || cin.trim() === "") {
        toast.error("ID card number is required");
        return false;
    }else if(cin.length !== 8 || eightPattern.test(cin) === false){
        toast.error("ID must be 8 digits");
        return false;
    }else if(role === "" || role.trim() === "") {
        toast.error("Provide your current role in the company");
        return false;
    } else {
        return true;
    }
}