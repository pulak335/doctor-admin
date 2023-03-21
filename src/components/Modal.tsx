import React from "react";
import styles from "../styles/Modal.module.css";

const Modal = ({ setIsOpen, setText, onClick }:any) => {
    return (
      <>
        <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Create a folder</h5>
            </div>
            <div className={styles.modalContent}>
              <input onChange={(e)=>setText(e.target.value)} type="text" className={styles.inputFeild} required/>
            </div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.cancelBtn} onClick={ onClick}>
                  Add
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Modal;