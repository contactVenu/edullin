import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';;

export default function App({ location }) {

    const [startDate, setStartDate] = useState(getLastMonthDate().toLocaleDateString('fr-ca'))
    const [endDate, setEndDate] = useState(new Date().toLocaleDateString('fr-ca'))
    const [foreCastData, setForeCastData] = useState(null)
    const [historicalData, setHistoricalData] = useState(null)
    const [graphData, setGraphData] = useState([])

    function getLastMonthDate() {
        const now = new Date();
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const formatDate = (date) => new Date(date).toDateString().slice(8, 10) + ' ' + new Date(date).toDateString().slice(4, 7)

    const getMaxValue = (field) => Math.max(...graphData.map(item => item[field]))

    const mergeData = (data1, data2) => {
        return data1?.time.map((item, index) => {
            return {
                time: item,
                forecast_Temperature: data1.temperature_2m[index],
                temperature_History: data2.temperature_2m[index],
                forecast_Rain: data1.rain[index],
                rain_History: data2.rain[index]
            }
        })
    }

    useEffect(() => {
        axios.all([
            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,rain&start_date=${startDate}&end_date=${endDate}&timezone=auto`),
            axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${location.latitude}&longitude=${location.longitude}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m,rain&timezone=auto`)
        ]).then(axios.spread((data1, data2) => {
            setForeCastData(data1.data.hourly)
            setHistoricalData(data2.data.hourly)
        })).catch(err => console.error(err))

    }, [location, startDate, endDate])

    useEffect(() => {
        if (foreCastData && historicalData) {
            const temp = mergeData(foreCastData, historicalData)
            setGraphData(temp)
        }
    }, [foreCastData, historicalData])


    return (<>
        <div className="d-flex justify-content-around m-2">
            <div className="d-flex align-items-center">
                <Form.Label className="m-1 h6">Start Date :</Form.Label>
                <Form.Control type="date" style={{ width: '200px' }} max={new Date().toLocaleDateString('fr-ca')} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="d-flex align-items-center">
                <Form.Label className="m-1 h6">End Date :</Form.Label>
                <Form.Control type="date" style={{ width: '200px' }} max={new Date().toLocaleDateString('fr-ca')} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
        </div>
        <div className="my-3 d-flex justify-content-around">
            <div className="d-flex flex-column align-items-center">
                <span className="small">Max Forecast Temperature</span>
                <span className="h6">{`${getMaxValue('forecastTemp')}°C`}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
                <span className="small">Max Forecast Rain</span>
                <span className="h6">{`${getMaxValue('forecastRain')}mm`}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
                <span className="small">Max Historical Temperature</span>
                <span className="h6">{`${getMaxValue('historyTemp')}°C`}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
                <span className="small">Max Historical Rain</span>
                <span className="h6">{`${getMaxValue('historyRain')}mm`}</span>
            </div>
        </div>
        <div className="h-75 w-100">
            <ResponsiveContainer>
                <ComposedChart
                    height={500}
                    width={1000}
                    data={graphData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tickFormatter={formatDate} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="forecast_Temperature"
                        stroke="#ff0000"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="temperature_History"
                        stroke="#0000ff"
                        strokeWidth={2}
                        dot={false} />
                    <Line
                        type="monotone"
                        dataKey="forecast_Rain"
                        stroke="#008000"
                        strokeWidth={1}
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="rain_History"
                        stroke="#ff1493"
                        strokeWidth={1}
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    </>
    );
}