import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import { motion, AnimatePresence } from "framer-motion";

const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

export default function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(false);

    async function getWeather(e) {
        e.preventDefault();
        setError("");
        setFetching(true);            // Indicate loading for animation
        try {
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
            const res = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
            );
            setWeather(res.data);       // Update weather
            setFetching(false);         // Done loading
        } catch (err) {
            setWeather(null);
            setError("City not found");
            setFetching(false);
        }
    }

    return (
        <motion.div
            className="weather-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
        >
            <form className="weather-form" onSubmit={getWeather}>
                <input
                    className="weather-input"
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    autoFocus
                    onChange={e => setCity(e.target.value)}
                />
                <button className="weather-btn" type="submit" disabled={fetching}>
                    {fetching ? "Loading..." : "Search"}
                </button>
            </form>
            <AnimatePresence mode="wait">
                {error && (
                    <motion.p
                        className="weather-error"
                        key="error"
                        {...fadeVariants}
                        transition={{ duration: 0.4 }}
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {weather && !fetching && (
                    <motion.div
                        key={weather.location.name + weather.current.last_updated}
                        className="weather-info"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={fadeVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.img
                            src={weather.current.condition.icon}
                            alt={weather.current.condition.text}
                            style={{ width: 80, height: 80 }}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        />
                        <h2 style={{ margin: "8px 0 0" }}>
                            {weather.location.name}, {weather.location.region}, {weather.location.country}
                        </h2>

                        <p style={{ fontSize: "1.2rem", color: "#555", margin: 0 }}>
                            {weather.current.condition.text}
                        </p>
                        <div style={{
                            margin: "16px 0",
                            fontSize: "2.2rem",
                            fontWeight: "bold",
                            color: "#7960d3"
                        }}>
                            {weather.current.temp_c}°C
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", color: "#333" }}>
                            <span>💧 Humidity: {weather.current.humidity}%</span>
                            <span>💨 Wind: {weather.current.wind_kph} kph</span>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                            <small style={{ color: "#555" }}>
                                Last updated: {weather.current.last_updated}
                            </small>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
