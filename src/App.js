import Div from './components/Div';
import TopButtons from './components/TopButtons';
import InputBox from './components/InputBox';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast';

function App() {
  return (
    <Div className="App ">
      <Div className="w-4/4 max-w-screen min-h-screen py-5 lg:px-16 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
        <TopButtons />
        <Inputs />
        <TimeAndLocation />
        <TemperatureAndDetails/>
        <Forecast title="Hourly forecast"/>
        <Forecast title="Daily forecast"/>
      </Div>
    </Div>
  );
}

export default App;
