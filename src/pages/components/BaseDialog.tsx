import React from 'react';
import styles from "@/styles/Dialog.module.css";
import Image from "next/image";


// Functional Dialog Component
const BaseDialog = ({ 
  renderContent,
  isOpen,
  title="", 
  onClose, 
  closeOnClickModal=true, 
  width = 500, 
  height = 600,
  renderFooter 
}) => {
    if (!isOpen) return null;
  
    const handleOverlayClick = (e) => {
      if (closeOnClickModal && e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
    <>
      <div className={styles.Overlay} onClick={handleOverlayClick}>
        <div className={styles.DialogContainer} style={{width: width + 'px', maxHeight: height + 'px'}}>
          <button className={styles.CloseButton} onClick={onClose}>
          <Image
            src="/close.svg"
            alt="Close"
            width={24}
            height={24}
            priority
          />
          </button>
          <h2 className={styles.Title}>{title}</h2>
            {renderContent()}
          <div className={styles.Footer}>
            {renderFooter()}
          </div>
        </div>
      </div>
      </>
    );
  };

export default BaseDialog;
