import { useState, useEffect, useContext } from "react"
import finnHub from "../api/finnHub"
import {BsCaretDownFill, BsCaretUpFill} from "react-icons/bs"
import { WatchListContext } from "../context/watchListContext"
import {useNavigate} from "react-router-dom"



export const StockList = () => {


    const [stock, setStock] = useState([])
    const {watchList, deleteStock} = useContext(WatchListContext)

    const navigate = useNavigate()


    useEffect(()=> {

        let isMounted = true
        const fetchData = async () => {
            try {
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnHub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))
                
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                console.log(data)
                if(isMounted){
                    setStock(data)
                } 
            } catch (err) {
                alert(err)
            }
        }
        fetchData()

        return () => (isMounted = false)

    }, [watchList])
    
    const handleStockSelect = (stockSymbol) => {
        navigate(`detail/${stockSymbol}`)
    }

    return (
        <table className="main_table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Current Price</th>
                <th>Change</th>
                <th>% Change</th>
                <th>High</th>
                <th>Low</th>
                <th>Open</th>
                <th>Prev close</th>
            </tr>
            </thead>
            <tbody>
                {stock.map((stockData) => {
                    return (
                        <tr style={{cursor: "pointer"}} className="t_row"  onClick={() => handleStockSelect(stockData.symbol)} key={stockData.symbol}>
                            <td>{stockData.symbol}</td>
                            <td>{stockData.data.c}</td>
                            <td className={(stockData.data.c >=0)? "green" : "red"}>{stockData.data.d}{(stockData.data.c >=0)? <BsCaretUpFill/> : <BsCaretDownFill/>}</td>
                            <td  className={(stockData.data.c >=0)? "green" : "red"}>{stockData.data.dp}{(stockData.data.c >=0)? <BsCaretUpFill/> : <BsCaretDownFill/>}</td>
                            <td>{stockData.data.h}</td>
                            <td>{stockData.data.l}</td>
                            <td>{stockData.data.o}</td>
                            <td>{stockData.data.pc}<button className="remove" onClick={ (e) => {
                            e.stopPropagation()
                            deleteStock(stockData.symbol)
                            }}>Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>
            
        </table>
    )
}