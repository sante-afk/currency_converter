import React from "react";

type CurrencyRowProps = {
    currencyOptions: string[], 
    selectedCurrency: string, 
    onChangeCurrency: () => void,
    onChangeAmount: () => void,
    amount: number,
}

export default function CurrencyRow({
    currencyOptions, 
    selectedCurrency, 
    onChangeCurrency,
    onChangeAmount,
    amount} : CurrencyRowProps) {
    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}