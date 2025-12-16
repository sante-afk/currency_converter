import React, { useEffect, useState } from "react"
import './App.css';
import CurrencyRow from "./CurrencyRow";
import LoadingSpinner from './LoadingSpinner';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/<api key>/latest/USD';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([])
  const [fromCurrency, setFromCurrency] = useState<string>('')
  const [toCurrency, setToCurrency] = useState<string>('')
  const [exchangeRate, setExchangeRate] = useState<number | undefined>(undefined)
  const [amount, setAmount] = useState<number>(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  interface Rates {
    [currency: string]: number
  }
  interface ApiResponse {
    base_code: string;
    conversion_rates: Rates;
  }

  useEffect(() => {
    if (!BASE_URL) {
      return;
    }
    fetch(BASE_URL)
      .then((res: Response) => res.json())
      .then((data: ApiResponse) => {
        const firstCurrency: string = Object.keys(data.conversion_rates)[0];
          setCurrencyOptions([...Object.keys(data.conversion_rates)])
          setFromCurrency(data.base_code)
          setToCurrency(firstCurrency)
          setExchangeRate(data.conversion_rates[firstCurrency])
        });
  }, []);

  useEffect(() => {
    if (fromCurrency != null || toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.conversion_rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

   if (!exchangeRate) {
    return <LoadingSpinner />;
  }

  const fromAmount = amountInFromCurrency ? amount : amount / exchangeRate;

  const toAmount = amountInFromCurrency ? amount * exchangeRate : amount;

  function hamdleFromAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value))
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value))
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Corrency converter</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => setFromCurrency(e.target.value)}
        onChangeAmount={hamdleFromAmountChange}
        amount={fromAmount} />
        <div className="equals">in</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount} />
    </>
  );
}
export default App
