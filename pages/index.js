import StockContainer from './stock-container';
import React, { useState, useEffect } from 'react';
import StockContainer from './stock-container';

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
        <StockContainer />
      </div>
    </div>
  )
}
