import NewsAggregator from "./components/NewsAggregator";
import UserManagement from "./components/UserManagement";
import WeatherApp from "./components/WeatherApp";

function App () {
  return(
    <div>
      <UserManagement/>
      <NewsAggregator/>
      <WeatherApp/>
    </div>
  )
}

export default App;