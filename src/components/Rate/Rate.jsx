import React from "react";
import "./Rate.scss";
import { useSelector } from "react-redux";

const Rate = ({ data, formatNumber }) => {
  const cure = useSelector((state) => {
    return state.curre;
  });

  return (
    <div className="rate">
      <ul>
        <div className="rateList">
          {data.map((item) => (
            <div key={item.r030.toString()}>
              {cure.cc !== "UAH" ? (
                <li key={item.r030.toString()}>
                  {item.cc} <span>{formatNumber(cure.rate / item.rate)}</span>
                </li>
              ) : (
                <li key={item.r030.toString()}>
                  {item.cc} <span>{formatNumber(item.rate)}</span>
                </li>
              )}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Rate;
