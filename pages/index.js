import StockContainer from './stock-container';
import React, { useState, useEffect } from 'react';
import StockContainer from './stock-container';

export default function Home() {
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
