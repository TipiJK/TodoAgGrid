import React, { useState, useRef } from'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import TextField from'@mui/material/TextField';
import Stack from'@mui/material/Stack';

function Todotable() {
    const [todo, setTodo] = useState({description: '', date: '', priority:''});
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();
    
    const inputChanged = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    }
    
    const addTodo = (event) => {
        setTodos([...todos, todo]);
    }
    
    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
        setTodos(todos.filter((todo, index) =>
        index !== gridRef.current.getSelectedNodes()[0].childIndex));
        }
        else {
        alert('Select row first');
        }
    }
    
    const columns = [
        {headerName: 'Date', field: 'date', sortable:true, filter: true, floatingFilter: true},
        {headerName: 'Description', field: 'description', sortable:true, filter: true, floatingFilter: true},
        {headerName: 'Priority', field: 'priority', sortable:true, filter: true, cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}, floatingFilter: true},
    ]

    return (
        <div>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                <TextField type="text" onChange={inputChanged} variant="standard" label="Description" name="description" value={todo.description}/>
                <TextField type="date" onChange={inputChanged} variant="standard" label="Date" name="date" value={todo.date} InputLabelProps={{ shrink: true }}/>
                <TextField type="text" onChange={inputChanged} variant="standard" label="Priority" name="priority" value={todo.priority}/>
                <Button onClick={addTodo} variant='contained'>Add</Button>
                <Button onClick={deleteTodo} variant='contained'>Delete</Button>
            </Stack>
            <br></br><br></br><br></br>

            <div className="ag-theme-material" style={{height: '700px', width: '50%', margin: 'auto'}} >
                <AgGridReact
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                columnDefs={columns}
                rowData={todos}
                animateRows={true}>
                </AgGridReact> 
            </div>
        </div>
    );
}

export default Todotable;