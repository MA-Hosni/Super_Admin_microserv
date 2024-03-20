import style from "@/Components/companies/popUpDelete.module.css"
import { useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';

const PopUpDelete = ({ company, onClose }:any) => {
    const { _id, companyName, email } = company;
    const [enteredEmail, setEnteredEmail] = useState("");
    const [error, setError] = useState("");
  
    const handleConfirm = async () => {
      if (enteredEmail === email) {
        try {
            console.log(_id)
            const response = await axios.delete(`/api/companies/companydelete?id=${_id}`);
            toast.success('Company deleted successfully');
            
        } catch (error) {
            toast.error('Error delete manager')
            console.error('Error delete manager:', error);
        }
        onClose();
        window.location.reload();
      } else {
        setError("Email does not match!");
      }
    };
  return (
    <div className={style.form}>
      <span className={style.title}>
        Delete Company {companyName}
      </span>
      <p className={style.description}>
        This action cannot be undone. This will permanently delete <b>{companyName}</b> Company. <br />
        <br /> Please type <b>{email}</b> to confirm.
      </p>
      <div>
      <input 
            placeholder="Enter the email here" 
            type="email" 
            name="email" 
            id="email-address" 
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className={style.boutounet}>
            <button className={style.boutou} onClick={onClose}>Cancel</button>
            <button onClick={handleConfirm}>Confirm Deletion</button>
        </div>
        
      </div>
    </div>
  );
}

export default PopUpDelete