import React, { useState, useEffect } from 'react';


export default function Stock(props) {

    const ticker = props.currency === "USD" ? 'OTC Pink: PKKFF' : 'CSE: PKK';

    return (
        <div className='stock-info'>
            <div className='stock-ticker _26pt-eyebrow'>{ticker}</div>
            <div className='stock-price-container'>
                <div className='inline-text'>$</div>
                <div className='inline-text'>{props.price}</div>
                <div className='inline-text currency-font'>{props.currency}</div>
            </div>
            <div className='stock-change _17pt-menu-top'>
                <div className='stock-price-change'>
                    <div>{props.changeAmount}</div>
                </div>
                <div className='stock-percentage-change'>
                    <div className='inline-text'>{props.changePercentage}</div>
                    <div className='inline-text'>%</div>
                </div>
            </div>
        </div>
    );

}