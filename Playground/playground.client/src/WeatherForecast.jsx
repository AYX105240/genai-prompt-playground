import { useEffect, useState } from 'react';
import { API_BASE_URL } from './apiConfig';

function WeatherForecast() {
    const [forecasts, setForecasts] = useState();
    useEffect(() => {
        fetch(`${API_BASE_URL}/weatherforecast`)
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
