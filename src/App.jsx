import "./App.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Converter from "./components/Converter/Converter";
import Rate from "./components/Rate/Rate";
import Header from "./components/Header/Header";

function App() {
  const [curData1, setCurData1] = useState({});
  const [curData2, setCurData2] = useState({});
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch((error) => {
        alert("OOOPS, this is ERROR");
      });
  }, []);

  const defaultCurrent = [
    { r030: 0, cc: "Select", rate: 0 },
    { r030: 3242, cc: "UAH", rate: 0 },
  ];

  const formatNumber = (number) => {
    return number.toFixed(2);
  };

  const handleChange1 = (e) => {
    let updatedValue = {};
    updatedValue = data.find((item) => item.cc === e.target.value);
    if (e.target.value === "UAH" || e.target.value === "Select") {
      updatedValue = defaultCurrent.find((item) => item.cc === e.target.value);
    }
    setCurData1((curData1) => ({
      ...curData1,
      ...updatedValue,
    }));
  };

  const handleChangeSelect1 = () => {
    setAmount2(formatNumber(amount1 * (curData1.rate / curData2.rate)));
    if (curData1.cc === "UAH") {
      setAmount2(formatNumber(amount1 / curData2.rate));
    } else if (curData2.cc === "UAH") {
      setAmount2(formatNumber(amount1 * curData1.rate));
    }

    if (curData1.cc === "Select") {
      return null;
    }
  };

  const handleChangeSelect2 = () => {
    setAmount1(formatNumber(amount2 * (curData2.rate / curData1.rate)));
    if (curData2.cc === "UAH") {
      setAmount1(formatNumber(amount2 / curData1.rate));
    } else if (curData1.cc === "UAH") {
      setAmount1(formatNumber(amount2 * curData2.rate));
    }

    if (curData2.cc === "Select") {
      return null;
    }
  };

  const handleChange2 = (e) => {
    let updatedValue = {};
    updatedValue = data.find((item) => item.cc === e.target.value);
    if (e.target.value === "UAH" || e.target.value === "Select") {
      updatedValue = defaultCurrent.find((item) => item.cc === e.target.value);
    }
    setCurData2((curData2) => ({
      ...curData2,
      ...updatedValue,
    }));
  };

  const amountChange1 = (amount1) => {
    if (curData1.cc === "UAH") {
      setAmount2(formatNumber(amount1 / curData2.rate));
      setAmount1(amount1);
    } else if (curData1.cc === "Select") {
      setAmount1(0);
      return null;
    } else if (curData2.cc === "UAH") {
      setAmount2(formatNumber(amount1 * curData1.rate));
      setAmount1(amount1);
    } else {
      setAmount2(formatNumber(amount1 * (curData1.rate / curData2.rate)));
      setAmount1(amount1);
    }
  };

  const amountChange2 = (amount2) => {
    if (curData2.cc === "UAH") {
      setAmount1(formatNumber(amount2 / curData1.rate));
      setAmount2(amount2);
    } else if (curData2.cc === "Select") {
      setAmount2(0);
      return null;
    } else if (curData1.cc === "UAH") {
      setAmount1(formatNumber(amount2 * curData2.rate));
      setAmount2(amount2);
      console.log("fds");
    } else {
      setAmount1(formatNumber(amount2 * (curData2.rate / curData1.rate)));
      setAmount2(amount2);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header data={data} defaultCurrent={defaultCurrent} />
        {loading ? (
          <h1 className="loading">LOADING...</h1>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Converter
                  data={data}
                  handleChange1={handleChange1}
                  handleChange2={handleChange2}
                  amount1={amount1}
                  amount2={amount2}
                  amountChange1={amountChange1}
                  amountChange2={amountChange2}
                  handleChangeSelect1={handleChangeSelect1}
                  handleChangeSelect2={handleChangeSelect2}
                  defaultCurrent={defaultCurrent}
                />
              }
            />
            <Route
              path="/rate"
              element={<Rate data={data} formatNumber={formatNumber} />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
