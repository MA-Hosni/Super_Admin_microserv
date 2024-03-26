import toast from "react-hot-toast"

export const validatePack = (name: string, price: number, textareas: { value: string }[]) => { 
    let isValid = true;

    if (name === "" || name.trim() === "") {
        toast.error("Pack name is required");
        isValid = false;
    }else if (price < 0) {
        toast.error("Price can not be negative");
        isValid = false;
    } else {
        textareas.forEach((textarea, index) => {
            if (textarea.value === "" || textarea.value.trim() === "") {
                toast.error(`Please fill textarea number ${index + 1}`);
                isValid = false;
            }
        });
    }

    return isValid;
};