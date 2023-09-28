import { useState } from "react"
import Chart from "react-apexcharts"

export const StockChart = ({chartData, symbol}) => {
    
    const [dateFormat, setDateFormat] = useState("24h")
    const {day, week, year} = chartData
   
    const determineTimeFormat =() => {
        
        switch(dateFormat) {
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return 
        }
     
    }

    const series = [{
        name: symbol,
        data: determineTimeFormat()
    }]

    // let color= (dateFormat == "day")? (x[x.length-1].y - x.y > 0)? "#26c281": "#26c281": "#ed3419"
    // (determineTimeFormat()[determineTimeFormat().length-1].y - determineTimeFormat()[0].y > 0)? "#26c281" : "#ed3419"

    // if(dateFormat === "24h") {
    //     = (determineTimeFormat()[determineTimeFormat().length-1].y - determineTimeFormat()[0].y > 0)? "#26c281" : "#ed3419"
    // }
     
    const options = {
        
        // colors: [],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart: {
            id: "Stock data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
             type: "datetime",
             labels: {
                dateTimeUTC: false
             }
        },
        tooltip: {
            x: {
                format: "dd MMM HH:MM"
            }
        }
    }

    

    const renderButtonSelect = (button) => {
        
        const classes = "btn"
        if(button === dateFormat) {
            return `${classes}-onselect`
        } else {
            return classes
        }
    }

    return (
        <div className="bg">
            <Chart options={options}
            series={series}
            type="area"
            width="100%" />

            <div>
                <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24h</button>
                <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
                <button className={renderButtonSelect("1y")} onClick={() => setDateFormat("1y")}>1y</button>
            </div>
        </div>
    )
}