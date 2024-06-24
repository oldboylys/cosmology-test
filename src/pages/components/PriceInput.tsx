import React, { useState, useRef, useEffect } from 'react';
import styles from "@/styles/PriceInput.module.css";
import Image from "next/image";

const PriceInput = ({
    leftTitle = "Select amount",
    rightRemarkFunc = () => {return <></>},
    disabled = false,
    placeholder = "Please input",
    currancyInfo = {},
    iconComponent: IconComponent,
    selectFunc = () => {return <></>}
}) => {
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (e) => {
    // const count = cleanAndLimitDecimal(e.target.value);
    
    setInputValue(e.target.value);
  };
  const handleInputBlur = (e) => {
    const count = cleanAndLimitDecimal(e.target.value);
    
    setInputValue(count);
  };
  
  function cleanAndLimitDecimal(input:any) {
    let cleaned = input.replace(/[^\d.]/g, '').trim();

    let parts = cleaned.split('.');
    
    if (parts.length > 1) {
        parts[1] = parts[1].substring(0, 10); // Limit to 10 decimal places
    }

    cleaned = parts.join('.');

    let result = parseFloat(cleaned);

    return isNaN(result) ? '' : result.toFixed(10); 
}



  return (
    <div>
        <div className={styles.TitleWrap}>
            <h4 className={styles.Title}>{leftTitle}</h4>
            <div>
                {rightRemarkFunc()}
            </div>
            
        </div>
        <div className={styles.SelectWrap}>
            <div className={styles.SelectImg} style={{width: "24px"}}>
                {IconComponent && <IconComponent />}
            </div>
            <input
                type="text"
                className={styles.FilterInput}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="Please Input"
            />
            {
                <div className={styles.PriceTrans}>
                    <strong style={{color: "black"}}>
                    ATOM 
                    </strong>
                    ≈ $1.013
                </div>
            }
        </div>
        <div className={styles.SelectFunc}>
            {
                selectFunc()
            }
        </div>
    </div>
  );
};

export default PriceInput;
