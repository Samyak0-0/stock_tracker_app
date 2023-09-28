import { useState, useEffect } from "react"
import finnHub from "../api/finnHub"

export const StockData = ({symbol}) => {

    const [stockData, setStockData] = useState()
    let isMounted = true
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await finnHub.get("/stock/profile2", {
                    params: {
                        symbol
                    }
                })
                if(isMounted) {
                    setStockData(response.data)
                }
            } catch(err) {
                alert(err)
            }
        }
        fetchData()
    },[symbol])


    return (
        <div>
            {stockData && (
                <div className="main-detail-body">
                    <div className="col">
                        <div className="body">
                            <span>name: </span>
                            {stockData.name}
                        </div>
                        <div className="body">
                            <span>country: </span>
                            {stockData.country}
                        </div>
                        <div className="body">
                            <span>ticker: </span>
                            {stockData.ticker}
                        </div>
                    </div>
                    <div className="col">
                        <div className="body">
                            <span>Exchange: </span>
                            {stockData.exchange}
                        </div>
                        <div className="body">
                            <span>Industry: </span>
                            {stockData.finnhubIndustry}
                        </div>
                        <div className="body">
                            <span>IPO: </span>
                            {stockData.ipo}
                        </div>
                    </div>
                    <div className="col">
                        <div className="body">
                            <span>MarketCap: </span>
                            {stockData.marketCapitalization}
                        </div>
                        <div className="body">
                            <span>Shares Outstanding: </span>
                            {stockData.shareOutstanding}
                        </div>
                        <div className="body">
                            <span>url: </span>
                            <a href={stockData.weburl} target="_blank">{stockData.weburl}</a>
                        </div>
                     </div>
            </div>)}
        </div>
    )
}
