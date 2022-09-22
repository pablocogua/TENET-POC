import Stock from './stock';
import React, { useState, useEffect } from 'react';

export default function Home() {

  const [date, setDate] = useState("");

  function handleDateChange(date) {
    setDate(() => {
      const updateDate = new Date(date);
      let year = updateDate.getUTCFullYear();
      let month = updateDate.toLocaleString('default', { month: 'long' });
      let day = updateDate.getUTCDate();
      let hour = updateDate.getHours();
      let minutes = updateDate.getMinutes();

      return `${month} ${day}, ${year} ${hour}:${minutes}`;
    });
  }

  return (
    <div className='investor-news-stock-section'>
      <div className='stock-quote'>
        <div className='_4col'>
          <h3 className='stock-quote-header _30pt-header'>Stock Performance</h3>
        </div>
        <div className='stock-info-container'>
          <Stock currency={"USD"} onDateChange={handleDateChange} />
          <div className='vertical-line'></div>
          <div className='horizontal-line'></div>
          <Stock currency={"CAD"} />
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
    </div>
  )
}
