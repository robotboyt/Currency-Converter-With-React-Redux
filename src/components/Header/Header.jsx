import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { addCurrency } from "../../app/slice";

const Header = ({ data, defaultCurrent }) => {
  const [currency, setCurrency] = useState({});

  const dispatch = useDispatch();

  const handleCurrency = (e) => {
    let updatedValue = {};
    updatedValue = data.find((item) => item.cc === e.target.value);
    if (e.target.value === "UAH" || e.target.value === "Select") {
      updatedValue = defaultCurrent.find((item) => item.cc === e.target.value);
    }
    setCurrency((currency) => ({
      ...currency,
      ...updatedValue,
    }));

    dispatch(
      addCurrency({
        valute: updatedValue || currency,
      })
    );
  };

  return (
    <div className="header">
      <div className="logo-container">
        <span className="logo">Currency Converter</span>
      </div>

      <div className="links">
        <Link to="/" className="link">
          Converter
        </Link>
        <Link to="rate" className="link">
          Rate
        </Link>
      </div>
      <div className="dropDown">
        <select onChange={(e) => handleCurrency(e)}>
          <option>UAH</option>
          {data.map((item) => (
            <option key={item.r030.toString()}>{item.cc}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Header;
