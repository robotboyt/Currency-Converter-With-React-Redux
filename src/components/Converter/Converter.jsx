import React from "react";
import Selector from "../Selector/Selector";

const Converter = ({
  data,
  handleChange1,
  amount1,
  amountChange1,
  defaultCurrent,
  handleChange2,
  amount2,
  amountChange2,
  handleChangeSelect1,
  handleChangeSelect2,
}) => {
  return (
    <div className="selector-container">
      <Selector
        handleChange={handleChange1}
        data={data}
        amountChange={amountChange1}
        amount={amount1}
        handleChangeSelect={handleChangeSelect1}
        defaultCurrent={defaultCurrent}
      />
      <span>TO</span>
      <Selector
        handleChange={handleChange2}
        data={data}
        amountChange={amountChange2}
        amount={amount2}
        handleChangeSelect={handleChangeSelect2}
        defaultCurrent={defaultCurrent}
      />
    </div>
  );
};

export default Converter;
