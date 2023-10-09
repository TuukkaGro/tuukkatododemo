
import { useRef, useState} from 'react'
import './App.css'
import { AgGridReact } from 'ag-grid-react'; 
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-material.css'; 


function App() {

  const [todo, setTodo] = useState({
    description:'',
    date: '',
    priority: ''
  });
  const [todos, setTodos] = useState([]);

  const gridRef = useRef(); 

  const [columnDefs] = useState([
    {field: 'description', sortable: true, filter: true, floatingFilter: true}, 
    {field: 'priority',  sortable: true, filter: true, floatingFilter: true,
    cellStyle: params => params.value === "high" ? {color: 'red'} : { color: 'black'}},
    {field: 'date',  sortable: true, filter: true, floatingFilter: true}
  ]);

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: '', priority: ''});
  }

  const deleteTodo = () =>{
    if (gridRef.current.getSelectedNodes().length > 0){
      const row = (gridRef.current.getSelectedNodes()[0].id);
      setTodos(todos.filter((item, index ) => row != index));
    }
    else{
      alert ('SELECT AT LEAST ONE ROW')
    }


  }

  return (
    <>
     <h3>My Todos</h3>
     <h4>Working hard or hardly working</h4>
     <input 
     value ={todo.description} 
     onChange={e => setTodo({...todo, description: e.target.value})}
     />
     <input 
     value ={todo.priority} 
     onChange={e => setTodo({...todo, priority: e.target.value})}
     />
     <input 
     type = "date"
     value ={todo.date} 
     onChange={e => setTodo({...todo, date: e.target.value})}
     />

     <button onClick={addTodo}>Add todo</button>
     <button onClick={deleteTodo}>Delete</button>
     <div className='ag-theme-material' style={{height: 500, width: 600}}>
      <AgGridReact 
        ref = {gridRef}
        onGridReady={params => gridRef.current = params.api}
        rowSelection='single'
        animateRows='true'
        columnDefs={columnDefs}
        rowData={todos}
      />

     </div>

     </>
  )
}

export default App
