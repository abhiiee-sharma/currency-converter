import { useState, useEffect } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  useEffect(() => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  }, [amount, from, to, currencyInfo]);

  const swap = () => {
    const oldFrom = from;
    setFrom(to);
    setTo(oldFrom);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundColor: "#2A629A",
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-600 dark:text-white">Currency Converter</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mb-2">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>

          <div className="flex justify-between mt-2">
            <a href="https://github.com/abhiiee-sharma/currency-converter" className="w-1/2 bg-blue-600 text-white px-4 py-3 rounded-lg text-center">GitHub</a>
            <div className="w-4" />
            <a href="https://www.linkedin.com/in/abhiiee/" className="w-1/2 bg-blue-600 text-white px-4 py-3 rounded-lg text-center">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
