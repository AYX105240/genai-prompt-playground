import { useEffect, useState } from 'react';
import { API_BASE_URL } from './apiConfig';
import { Link } from 'react-router-dom';

function WeatherForecast() {
    const [forecasts, setForecasts] = useState();
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const res = await fetch(`${API_BASE_URL}/weatherforecast`, {
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                });
                if (res.status === 401 || (!token && res.status === 403)) {
                    setError('Unauthorized. Please log in to view weather.');
                    return;
                }
                if (!res.ok) throw new Error('Failed to fetch weather');
                const data = await res.json();
                setForecasts(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchWeather();
    }, []);
    if (error) return <div><p>Error: {error}</p><p><Link to="/login">Go to Login</Link></p></div>;
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
