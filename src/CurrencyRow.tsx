import React from "react";
import { TextField, NativeSelect, Box  } from '@mui/material';

type CurrencyRowProps = {
    currencyOptions: string[], 
    selectedCurrency: string, 
    onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
    amount: number,
}

export default function CurrencyRow({
    currencyOptions, 
    selectedCurrency, 
    onChangeCurrency,
    onChangeAmount,
    amount} : CurrencyRowProps) {
    return (
        <Box 
            component="div" 
            sx={{
                display: 'flex',      
                alignItems: 'flex-start', 
                gap: 2,                 
                padding: 2,
            }}>
            <TextField 
                type="number" 
                className="input" 
                value={amount} 
                onChange={onChangeAmount}/>
            <NativeSelect
                value={selectedCurrency} 
                onChange={onChangeCurrency}>
                    {currencyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                ))}
            </NativeSelect> 
        </Box>
    )
}