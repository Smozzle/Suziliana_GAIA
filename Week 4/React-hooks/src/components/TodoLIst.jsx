import { useState } from "react";

function TodoList(){
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    
    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos(prevTodos => [
                ...prevTodos,
                {id: Date.now(), text: inputValue, completes: false}
            ]);
            setInputValue('');
        }
    };

    const toggleToDo = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return(
        <div>
            <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a todo"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}
                        onClick={() => toggleToDo(todo.id)}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;