import Stock from './stock';
import React, { useState, useEffect, useRef } from 'react';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fd0fc6549emsh32a8f90c3aac75cp1b0a30jsn73b76f4c2bcd',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
};

function formatDate() {
    const updateDate = new Date();
    let year = updateDate.getUTCFullYear();
    let month = updateDate.toLocaleString('default', { month: 'long' });
    let day = updateDate.getUTCDate();
    let hour = updateDate.getHours();
    let ampm = hour >= 12 ? 'pm' : 'am'
    let minutes = updateDate.getMinutes();
    console.log(`${month} ${day}, ${year} ${hour}:${minutes}`);
    return `${month} ${day}, ${year} ${hour}:${minutes.toString().length == 1 ? '0'+minutes : minutes} ${ampm}`;
}


export default function StockContainer(props) {

    const ref = useRef(null)
    const [price, setPrice] = useState(0);
    const [lastPrice, setLastPrice] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);
    const [changePercentage, setchangePercentage] = useState(0);
    const [date, setDate] = useState('');

    const [priceCAD, setPriceCAD] = useState(0);
    const [changeAmountCAD, setChangeAmountCAD] = useState(0);
    const [changePercentageCAD, setchangePercentageCAD] = useState(0);

    const fetchData = () => {

        //Fetch USD STOCK
        fetch('https://twelve-data1.p.rapidapi.com/quote?symbol=PKKFF&interval=1day&outputsize=30&format=json', options)
            .then(response => response.json())
            .then((response) => {
                setPrice(Number(response.close).toFixed(2));
                setChangeAmount(Number(response.change).toFixed(2));
                setchangePercentage(Number(response.percent_change).toFixed(2));
                setDate(() => {
                    props.updatedDate(formatDate());
                    return formatDate();
                });

            })
            .catch(err => console.error(err));

        //Fetch CAD   
        fetch('https://webapi.thecse.com/trading/listed/securities/PKK.json')
            .then(response => response.json())
            .then((response) => {
                setPriceCAD(response.ticker["Last Price"]);
                setChangeAmountCAD(response.ticker["Net Change"]);
                setchangePercentageCAD(Number(response.ticker["Net Change Percentage"]).toFixed(2));
            })
            .catch(err => console.error(err));

    };

    useEffect(() => {

        fetchData();

        ref.current = setInterval(() => fetchData(), 10 * 60 * 1000);

        return () => {
            if (ref.current) {
                clearInterval(ref.current)
            }
        }

    }, []);


    return (
        <div className='stock-info-container'>
            <Stock price={price} currency={"USD"} changeAmount={changeAmount} changePercentage={changePercentage} />
            <div className='vertical-line'></div>
            <div className='horizontal-line'></div>
            <Stock price={priceCAD} currency={"CAD"} changeAmount={changeAmountCAD} changePercentage={changePercentageCAD} />
        </div>
    );

}