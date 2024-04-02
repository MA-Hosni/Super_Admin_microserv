import toast from "react-hot-toast"

export const validatePack = (name: string, price: number, min: number, max: number, textareas?: { value: string }[]) => { 
    let isValid = true;

    if (name === "" || name.trim() === "") {
        toast.error("Pack name is required");
        isValid = false;
    }else if (price < 0) {
        toast.error("Price can not be negative");
        isValid = false;
    }else if (min < 1) {
        toast.error("Minimum number of users is one");
        isValid = false;
    }else if (max < min) {
        toast.error("Maximum number of users can not be less then Minimum number of users");
        isValid = false;
    } else if (textareas) {
        textareas.forEach((textarea, index) => {
            if (textarea.value === "" || textarea.value.trim() === "") {
                toast.error(`Please fill textarea number ${index + 1}`);
                isValid = false;
            }
        });
    }

    return isValid;
};