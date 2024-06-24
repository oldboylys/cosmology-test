import React, { useState, useRef, useEffect } from 'react';
import styles from "@/styles/Select.module.css";
import Image from "next/image";

const Select = ({
    title = "Select",
    width = "47%",
    data = [],
    disabled = false,
    clearable = false,
    placeholder = "请选择",
    style = {},
    filterable = false,
    onChange,
    iconComponent: IconComponent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
    setInputValue(option.name);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
    setInputValue('');
  };
  async function fetchSVG(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch SVG');
      }
      const svgText = await response.text();
    //   console.log(svgText)
      return svgText;
    } catch (error) {
      console.error('Error fetching SVG:', error);
      return null;
    }
  }

  const filteredOptions = filterable
    ? data.filter((option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : data;

  return (
    <div ref={selectRef} style={{width: width,position:"relative"}}>
        <h4 className={styles.Title}>{title}</h4>
        {/* select主体 */}
        <div className={styles.SelectWrap}>
            <div className={styles.SelectImg} style={{width: "24px"}}>
                {IconComponent && <IconComponent />}
            </div>
            <input
            type="text"
            className={styles.FilterInput}
            value={inputValue}
            onChange={handleInputChange}
            onClick={toggleDropdown}
            placeholder="Filter options..."
            />
            {
                clearable&& inputValue&&
                    <Image
                        src="/close.svg"
                        alt="Close"
                        className={styles.Clear}
                        width={24}
                        height={24}
                        priority
                        onClick={handleClear}
                    />
                
            }
        </div>
      {isOpen && (
        <ul className={styles.OptionWrap}>
          {filteredOptions.map((option) => (
            <li
              key={option.symbol}
              onClick={() => handleOptionClick(option)}
              className={styles.OptionItem}
            >
                {/* <Image
                    // 这个组件src不能传入func，不然图标应该能正常显示
                    src={fetchSVG(option.logo_URIs?.svg)}
                    alt={option.name}
                    className={styles.Clear}
                    style={{alignSelf:"center",marginTop: "20px",color: '#848fa0'}}
                    width={24}
                    height={24}
                    priority
                    onClick={handleClear}
                /> */}
                {IconComponent && <IconComponent />}
                 {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
