import React, { useState, useEffect } from 'react';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fd0fc6549emsh32a8f90c3aac75cp1b0a30jsn73b76f4c2bcd',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
};


export default function Stock(props) {
    const [price, setPrice] = useState(0);
    const [lastPrice, setLastPrice] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);
    const [changePercentage, setchangePercentage] = useState(0);
    const ticker = props.currency === "USD" ? 'OTC Pink: PKKFF' : 'CSE: PKK';
    const url = `https://twelve-data1.p.rapidapi.com/time_series?symbol=PKKFF&interval=15min&outputsize=30&format=json`;

    useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                setPrice(Number(response.values[0].close).toFixed(2));
                setLastPrice(Number(response.values[1].close));
                let changeStockAmount = (price - lastPrice).toFixed(2);
                setChangeAmount(changeStockAmount);
                setchangePercentage(() => {
                    return (((changeStockAmount * 100) / lastPrice).toFixed(2));
                });
                props.onDateChange(response.values[0].datetime);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='stock-info'>
            <div className='stock-ticker _26pt-eyebrow'>{ticker}</div>
            <div className='stock-price-container'>
                <div className='inline-text'>$</div>
                <div className='inline-text'>{price}</div>
                <div className='inline-text currency-font'>{props.currency}</div>
            </div>
            <div className='stock-change _17pt-menu-top'>
                <div className='stock-price-change'>
                    <div>{changeAmount}</div>
                </div>
                <div className='stock-percentage-change'>
                    <div className='inline-text'>{changePercentage}</div>
                    <div className='inline-text'>%</div>
                </div>
            </div>
        </div>
    );

}