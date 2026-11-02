import Counter from "./Components/counter";
import ExpenseTracker from "./components/ExpenseTracker";
import ShoppingCart from "./components/ShoppingCart";
import Temperatureconverter from "./components/TemperatureConverter";
import TodoList from "./components/ToDoLIst";
import UserForm from "./components/UserForm";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div>
      <ExpenseTracker/><ShoppingCart /><Temperatureconverter/><TodoList/><UserForm/><UserProfile/><Counter/>
    </div>
  );
}

export default App;