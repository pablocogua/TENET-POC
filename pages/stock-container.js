import Stock from './stock';
import React, { useState, useEffect } from 'react';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fd0fc6549emsh32a8f90c3aac75cp1b0a30jsn73b76f4c2bcd',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
};

function formatDate(date) {
    const updateDate = new Date(date);
    let year = updateDate.getUTCFullYear();
    let month = updateDate.toLocaleString('default', { month: 'long' });
    let day = updateDate.getUTCDate();
    let hour = updateDate.getHours();
    let minutes = updateDate.getMinutes();

    return `${month} ${day}, ${year} ${hour}:${minutes}`;
}


export default function StockContainer(props) {
    const [price, setPrice] = useState(0);
    const [lastPrice, setLastPrice] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);
    const [changePercentage, setchangePercentage] = useState(0);
    const [date, setDate] = useState('');

    const [priceCAD, setPriceCAD] = useState(0);
    const [changeAmountCAD, setChangeAmountCAD] = useState(0);
    const [changePercentageCAD, setchangePercentageCAD] = useState(0);

    const ticker = props.currency === "USD" ? 'OTC Pink: PKKFF' : 'CSE: PKK';

    useEffect(() => {
        //Fetch USD STOCK
        fetch(`https://twelve-data1.p.rapidapi.com/time_series?symbol=PKKFF&interval=15min&outputsize=30&format=json`, options)
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
                setDate(formatDate(response.values[0].datetime));
            })
            .catch(err => console.error(err));

        //Fetch CAD   
        fetch('https://webapi.thecse.com/trading/listed/securities/PKK.json')
            .then(response => response.json())
            .then((response) => {
                console.log(response.ticker);
                setPriceCAD(response.ticker["Last Price"]);
                setChangeAmountCAD(response.ticker["Net Change"] !== null ? response.ticker["Net Change"] : 0.00);
                setchangePercentageCAD(response.ticker["Net Change Percentage"]);
            })
            .catch(err => console.error(err));

    }, []);


    return (
        <div>
            <div className='stock-info-container'>
                <Stock price={price} currency={"USD"} changeAmount={changeAmount} changePercentage={changePercentage} />
                <div className='vertical-line'></div>
                <div className='horizontal-line'></div>
                <Stock price={priceCAD} currency={"CAD"} changeAmount={changeAmountCAD} changePercentage={changePercentageCAD} />
            </div>
            <div className='_4col'>
                <div className='stock-delay-info-container _17pt-light-spacing'>
                    <div className='inline-text'>Price delayed by </div>
                    <div className='updated-time'>15 minutes.&nbsp;</div>
                    <div className='inline-text'>Last updated </div>
                    <div className='inline-text'>{date}</div>
                </div>
                <p className='stock-comment _17pt-light-spacing'>The stock information provided is for informational purposes only and is not intended for trading purposes.</p>
            </div>
        </div>
    );

}