import { StockList } from "../componenets/stockList"
import { AutoComplete } from "../componenets/autoComplete"


export const StockOverviewPage = () => {
    return (
        <section>
            
            <AutoComplete />
            <StockList />
            
        </section>
    )
}