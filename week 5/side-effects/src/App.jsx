import RealTimeClock from "./components/RealTimeClock";
import UserProfile from "./components/UserProfile";
import WindowTracker from "./components/WindowTracker";

function App (){
  return(
    <div>
      <RealTimeClock/>
      <WindowTracker/>
      <UserProfile/>
    </div>
  );
}

export default App;