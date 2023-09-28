import { useState, useEffect } from "react"
import finnHub from "../api/finnHub"
import { WatchListContext } from "../context/watchListContext"
import { useContext } from "react"

export const AutoComplete = () => {

    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const {addStock, deleteStock} = useContext(WatchListContext)

    function renderDropDown () {
        let state = (search)? "show" : "hide" 
        return (
        <ul className={`dropdown-menu-${state}`}>
            {results.map((result) => {
                return(
                <li onClick={() => {
                    addStock(result.symbol)
                    setSearch("")
                }} key={result.symbol}>{result.description} ({result.symbol})</li>
                )
            })}
        </ul>
        )
    }

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            try{
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                })
                if(isMounted){
                    setResults(response.data.result)
                }
            } catch (err) {
                alert(err)
            }
        }
        if(search.length > 0) {
            fetchData()
        } else {
             setResults([])       
        }
    }, [search])

    return (
        <div className="auto-main-body">
            <div className="middle">
                <input type="text" className="search-bar" autoComplete="off" 
                placeholder="Your stocks here . . . "
                value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="list">{renderDropDown()}</div>
        </div>
    )
}