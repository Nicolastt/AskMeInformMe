import React, {useState} from 'react';
import {Alert, Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {useNavigate} from 'react-router-dom';

const Login = ({onLogin}) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/login_user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setMessage('');
                } else {
                    onLogin(data.imagePath);
                    setMessage('Login successful');
                    setError('');
                    setTimeout(() => navigate('/pregunta'), 2000);
                }
            })
            .catch(() => {
                setError('An unexpected error occurred');
                setMessage('');
            });
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md="6">
                    <Card className="shadow-lg">
                        <CardBody>
                            <CardTitle tag="h2" className="text-center mb-4">Login</CardTitle>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary" block className="mb-3">Login</Button>
                            </Form>
                            {message && <Alert color="success" className="mt-3">{message}</Alert>}
                            {error && <Alert color="danger" className="mt-3">{error}</Alert>}
                            <Button color="secondary" block onClick={handleGoBack}>Go Back</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
