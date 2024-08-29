// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Badge, Button, Col, Container, Row, Table } from 'react-bootstrap';
import './app.scss';
import { useEffect, useState } from 'react';

export function App() {
  const [employee, setEmployee] = useState<any[]>([]);
  const [employeeSelected, setEmployeeSelected] = useState<any>();

  const onClickViewEmployee = () => {
    alert(JSON.stringify(employeeSelected));
  };

  const onClickRow = (item: any) => {
    setEmployeeSelected(item);
    console.log('Employee Selected', item);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      const responsePaser = await response.json();
      setEmployee(responsePaser);
    })();
  }, []);

  return (
    <Container className="container">
      <Row className="mb-2">
        <Button className="mr-2">Refresh</Button>
        <Button onClick={onClickViewEmployee}>View employee</Button>
      </Row>
      <Row>
        <Table className="table" bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((item) => (
              <tr
                onClick={() => onClickRow(item)}
                className={
                  '' +
                  employeeSelected && employeeSelected?.id === item.id
                    ? 'active'
                    : ''
                }
              >
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{item.completed ? 'Completed' : 'Not Complete'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default App;
