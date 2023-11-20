import Div from './components/Div';
import Typhography from './components/Typhography';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
	const [query, setQuery] = useState({ q: "dhaka" })
	const [units, setUnits] = useState("metric")
	const [weather, setWeather] = useState(null)
	const dayData = []
	useEffect(() => {
		//Fetch Data
		const fetchWeather = async () => {
			await getFormattedWeatherData({ ...query, units }).then(
				(data) => {
					if (data) {
						toast.success(
							`successfully fetched weather for ${data.name}, ${data.country}`
						)
					} else {
						toast.error(
							`City Not found`
						)
					}
					setWeather(data)
				});
		}
		fetchWeather()
	}, [query, units])

	//Made a new array for line chart
	weather && weather.daily.map((item) => {
		return {
			name: item.title,
			max: item.max_temp.toFixed(),
			min: item.min_temp.toFixed(),
		};
	}).forEach((data) => {
		dayData.push(data);
	});

	//Change Background with high temperature
	const changeBackground = () => {
		if (!weather) return "bg-fresh-weather"
		const threshold = units === "metric" ? 27 : 81;
		if (weather.temp <= threshold) {
			return "bg-fresh-weather"
		}
		return "bg-hot-weather"
	}

	return (
		<Div className="App ">
			<Div className={`w-4/4 max-w-screen min-h-screen bg-fresh-weather bg-cover bg-no-repeat h-fit shadow-xl shadow-gray-400 ${changeBackground()}`}>
				<Div className={`w-4/4 max-w-screen min-h-screen p-5 bg-gradient-to-br from-[#0000008f] to-[#0315288f] h-fit shadow-xl shadow-gray-400`}>
					<TopButtons setQuery={setQuery} />
					<Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
					{weather ?
						<>
							<TimeAndLocation weather={weather} />
							<TemperatureAndDetails weather={weather} />

							{/* <Div className="flex flex-col justify-center items-center mt-6 gap-5 w-full">
								<Typhography as="p" className="text-white font-medium uppercase text-xl border-b d-block py-3">5Days Forecast</Typhography>
							</Div>

							<Div className="flex flex-row flex-wrap h-[400px] md:h-[400px] justify-center">
								<Div className="w-full md:w-2/4 mt-6 block">
									<ResponsiveContainer width="100%" height="100%">
										<LineChart
											width={600}
											height={300}
											data={dayData}
											margin={{
												top: 5,
												right: 30,
												left: 20,
												bottom: 5,
											}}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="name" />
											<YAxis />
											<Tooltip />
											<Legend />
											<Line type="monotone" dataKey="max" stroke="#8884d8" strokeDasharray="5 5" />
											<Line type="monotone" dataKey="min" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
										</LineChart>
									</ResponsiveContainer>
								</Div>
							</Div> */}

							<Div className="flex flex-row flex-wrap">
								<Forecast title="Daily forecast" items={weather.daily} />
								<Forecast title="Hourly forecast" items={weather.hourly} />

								

							</Div>
						</>
						:
						<h1 className='text-white text-center text-3xl mt-10'>City Not Found</h1>
					}

					<ToastContainer
						position="top-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover={false}
						theme="light"
					/>
				</Div>
			</Div>
		</Div>
	);
}

export default App;
