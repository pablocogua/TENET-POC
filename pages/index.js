import StockContainer from './stock-container';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [date, setDate] = useState('');
  const updatedDate = (date) => {
    setDate(() => { return date; });
  };

  return (
    <div className='investor-news-stock-section'>
      <div className='stock-quote'>
        <div className='_4col'>
          <h3 className='stock-quote-header _30pt-header'>Stock Performance</h3>
        </div>
        <StockContainer updatedDate={updatedDate} />
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
    </div>
  )
}
