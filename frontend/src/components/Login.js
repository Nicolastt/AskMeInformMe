import React, {useState} from 'react';
import {Alert, Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {useNavigate} from 'react-router-dom';

const Login = ({onLogin}) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
                    onLogin(data.name, data.imagePath);
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
                            <h1 tag="h1" className="display-4  text-dark"
                                       style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}>
                                Ask Me
                            </h1>
                            <h2 tag="h2" className="display-6  text-dark"
                                       style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}>
                                Inform Me
                            </h2>


                            <div className="text-center mb-4" style={{maxWidth: '50%', margin: '0 auto'}}>
                                <img src="/images/gato.jpg" alt="Home" className="img-fluid"
                                     style={{width: '100%', height: 'auto'}}/>
                            </div>


                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Nombre</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary" block className="mb-3">Iniciar sesión</Button>
                            </Form>
                            {message && <Alert color="success" className="mt-3">{message}</Alert>}
                            {error && <Alert color="danger" className="mt-3">{error}</Alert>}
                            <Button color="dark" block onClick={handleGoBack}>Volver</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
