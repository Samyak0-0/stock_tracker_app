import { createContext } from "react";
import { useState, useEffect } from "react";
import { StockDetailPage } from "../pages/stockDetailPage";

export const WatchListContext = createContext()

export const WatchListContextProvider = (props) =>{
    
    const [watchList, setWatchList] = useState(
        JSON.parse(localStorage.getItem("watchList")) ||
        [
        "GOOGL", "AMZN", "MSFT"
    ])

    useEffect(() => {
        localStorage.setItem("watchList", JSON.stringify(watchList))
        console.log(watchList)
    }, [watchList])

    const addStock = (stock) => {
        if(watchList.indexOf(stock) === -1) {
        setWatchList([...watchList, stock])
        }
    }

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((st) => {
            return st !== stock
        }))
    }

    return <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
        {props.children}
    </WatchListContext.Provider>
}