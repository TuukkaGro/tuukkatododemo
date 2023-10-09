function Todotable(props){
    return(

        <table>
            <tbody>
          {
            props.todos.map((todo, index) =>
              <tr key={index}>
                <td>{todo.date}</td>
                <td>{todo.description}</td>
                <td><button onClick = {() => props.deleteTodo(index)}>Delete</button></td>
              </tr>
              )
          }
            </tbody>
       </table>
    );
}

export default Todotable;