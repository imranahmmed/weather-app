import Div from './components/Div';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
// import getFormattedWeatherData from './services/weatherServiceV2';

function App() {
	const [query, setQuery] = useState({ q: "dhaka" })
	const [units, setUnits] = useState("metric")
	const [weather, setWeather] = useState(null)

	useEffect(() => {
		const fetchWeather = async () => {
			await getFormattedWeatherData({ ...query, units }).then((data) => { setWeather(data) });
		}
		fetchWeather()
	}, [query, units])

	const changeBackground = () => {
		if (!weather) return "bg-fresh-weather"
		const threshold = units === "metric" ? 20 : 60;
		const cold = units === "metric" ? 10 : 20;

		if (weather.temp <= threshold) {
			return "bg-fresh-weather"
		}
		if (weather.temp <= cold) {
			return "bg-cold-weather"
		}
		return "bg-hot-weather"
	}


	return (
		<Div className="App ">
			<Div className={`w-4/4 max-w-screen min-h-screen bg-fresh-weather bg-cover bg-no-repeat h-fit shadow-xl shadow-gray-400 ${changeBackground()}`}>
				<Div className="w-4/4 max-w-screen min-h-screen py-5 lg:px-16 bg-gradient-to-br from-[#00000061] to-[#031528c2] h-fit shadow-xl shadow-gray-400">
					<TopButtons setQuery={setQuery} />
					<Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
					{weather &&
						<>
							<TimeAndLocation weather={weather} />
							<TemperatureAndDetails weather={weather} />
							<Div className="flex flex-row flex-wrap">
								<Forecast title="Hourly forecast" items={weather.hourly} />
								<Forecast title="Daily forecast" items={weather.daily} />
							</Div>
						</>
					}
				</Div>
			</Div>
		</Div>
	);
}

export default App;
