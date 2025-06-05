import WeatherForecast from './WeatherForecast';
import Users from './Users';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Router>
            <nav style={{ marginBottom: 20 }}>
                <Link to="/" style={{ marginRight: 10 }}>Home</Link>
                <Link to="/weather" style={{ marginRight: 10 }}>Weather Forecast</Link>
                <Link to="/users">Users</Link>
            </nav>
            <Routes>
                <Route path="/" element={
                    <div>
                        <h1>Welcome to the Playground App</h1>
                        <p>Select a page above.</p>
                    </div>
                } />
                <Route path="/weather" element={<WeatherForecast />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </Router>
    );
}

export default App;