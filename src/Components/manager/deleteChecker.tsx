import style from "@/Components/manager/deleteChecker.module.css"
import { useState } from "react";

const DeleteChecker = ({ manager, onClose, onDeleteConfirm }:any) => {
    const { firstName, lastName, email } = manager;
    const [enteredEmail, setEnteredEmail] = useState("");
    const [error, setError] = useState("");
  
    const handleConfirm = async () => {
      if (enteredEmail === email) {
        onDeleteConfirm(); // Call the callback to handle deletion
      } else {
        setError("Email does not match!");
      }
    };
  
  return (
    <div className="absolute top-4 right-1/3 z-20">
    <div className={style.card}>
      <button className={style.dismiss} onClick={onClose}>×</button>
      <div className={style.header}>
          <span className={style.title}>
            Delete manager {firstName} {lastName}
          </span>
          <p className={style.description}>
            This action cannot be undone. This will permanently delete {firstName} {lastName}. <br />
            <br /> Please type <b>{email}</b> to confirm.
          </p>
          <br />
          <input 
          placeholder="Enter the email here" 
          type="email" 
          name="email" 
          id="email-address" 
          value={enteredEmail}
          onChange={(e) => setEnteredEmail(e.target.value)}
          />
          {error && <p className="text-xs" style={{ color: 'red' }}>{error}</p>}
      
          <div className={style.actions}>
              <button type="button" className={style.history} onClick={handleConfirm}>Confirm Deletion</button>
          </div>
      </div>
    </div>
    </div>
  );
}

export default DeleteChecker