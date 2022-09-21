import Stock from '../stockperformance/stock';

export default function StockPerformance() {

    const firstTicker = "PKKFF";
    return (
        <Stock ticker={firstTicker} />
    );

}