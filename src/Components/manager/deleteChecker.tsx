import style from "@/Components/manager/deleteChecker.module.css"
import { useState } from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const DeleteChecker = ({ manager, onClose }:any) => {
    const { _id, firstName, lastName, email } = manager;
    const [enteredEmail, setEnteredEmail] = useState("");
    const [error, setError] = useState("");
  
    const handleConfirm = async () => {
      if (enteredEmail === email) {
        try {
            console.log(_id)
            const response = await axios.delete(`/api/managers/managerdelete?id=${_id}`);
            toast.success('Manager deleted successfully');
            
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
        Delete manager {firstName} {lastName}
      </span>
      <p className={style.description}>{_id}
        This action cannot be undone. This will permanently delete {firstName}{" "}
        {lastName}. <br />
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

export default DeleteChecker