import {
  Button,
  Container,
  Row,
  Table,
  Spinner,
  Modal,
  ListGroup,
} from 'react-bootstrap';

import './app.scss';
import { useEffect, useState } from 'react';
import ApiContext, { AUTHORIZE_URL } from './apiContext';

export function App() {
  const [show, setShow] = useState(false);

  const [employee, setEmployee] = useState<any[]>([]);
  const [employeeSelected, setEmployeeSelected] = useState<any>();
  const [loading, setLoading] = useState(false);

  const onClickViewEmployee = () => {
    setShow(true);
    // alert(JSON.stringify(employeeSelected));
  };

  const onClickRow = (item: any) => {
    setEmployeeSelected(item);
  };

  const handleClose = () => setShow(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await ApiContext.GetToken();
      if (!token) {
        alert('Error Get Token');
        return;
      }
      const employee = await ApiContext.GetEmployee(token.token);
      if (!employee) {
        alert('Error Get Employee');
        return;
      }
      setEmployee(employee.result);
    } catch (error) {
      alert(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  return (
    <>
      <Container className="container">
        <div className="mb-2 d-flex gap-2">
          <a
            className="btn btn-primary"
            href={AUTHORIZE_URL}
            role="button"
            target="_blank"
            rel="noreferrer"
          >
            Authorize
          </a>
          <Button className="mr-2" onClick={fetchData}>
            Refresh
          </Button>
          <Button onClick={onClickViewEmployee}>View employee</Button>
          {loading && <Spinner animation="border" variant="success" />}
        </div>
        <Row>
          <Table className="table" bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>LAST NAME</th>
                <th>EMAIL</th>
                <th>ACTIVE</th>
                <th>IS_ONLINE</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((item) => (
                <tr
                  key={item.ID}
                  onClick={() => onClickRow(item)}
                  className={employeeSelected?.ID === item.ID ? 'active' : ''}
                >
                  <td>{item.ID}</td>
                  <td>{item.NAME}</td>
                  <td>{item.LAST_NAME}</td>
                  <td>{item.EMAIL}</td>
                  <td>{item.ACTIVE ? 'ACTIVE' : 'DEACTIVATE'}</td>
                  <td>{item.IS_ONLINE === 'Y' ? 'ONLINE' : 'OFFLINE'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {employeeSelected && (
            <>
              <ListGroup>
                <ListGroup.Item>ID: {employeeSelected.ID}</ListGroup.Item>
                <ListGroup.Item>XML_ID: {employeeSelected.XML_ID}</ListGroup.Item>
                <ListGroup.Item>ACTIVE: {employeeSelected.ACTIVE ? 'ACTIVE' : 'DEACTIVATE'}</ListGroup.Item>
                <ListGroup.Item>NAME: {employeeSelected.NAME}</ListGroup.Item>
                <ListGroup.Item>LAST_NAME: {employeeSelected.LAST_NAME}</ListGroup.Item>
                <ListGroup.Item>SECOND_NAME: {employeeSelected.SECOND_NAME}</ListGroup.Item>
                <ListGroup.Item>EMAIL: {employeeSelected.EMAIL}</ListGroup.Item>
                <ListGroup.Item>LAST_LOGIN: {employeeSelected.LAST_LOGIN}</ListGroup.Item>
                <ListGroup.Item>
                  DATE_REGISTER: {employeeSelected.DATE_REGISTER}
                </ListGroup.Item>
                <ListGroup.Item>IS_ONLINE: {employeeSelected.IS_ONLINE ? 'ONLINE' : 'OFFLINE'}</ListGroup.Item>
                <ListGroup.Item>USER_TYPE: {employeeSelected.USER_TYPE}</ListGroup.Item>
              </ListGroup>

              <pre>{JSON.stringify(employeeSelected, null, 4)}</pre>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
