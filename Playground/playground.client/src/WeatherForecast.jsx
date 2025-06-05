import { useEffect, useState } from 'react';

function WeatherForecast() {
    const [forecasts, setForecasts] = useState();
    useEffect(() => {
        fetch('http://localhost:7000/weatherforecast')
            .then(res => res.json())
            .then(setForecasts);
    }, []);
    if (!forecasts) return <p>Loading weather...</p>;
    return (
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default WeatherForecast;
