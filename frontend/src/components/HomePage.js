import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <Row className="text-center mb-4">
                <Col>
                    <h1 className="display-4 mb-2">Bienvenido a AskMeInformMe</h1>
                    <h2 className="display-5 text-muted">¡El mejor lugar para probar tus conocimientos!</h2>
                </Col>
            </Row>
            <Row className="text-center mb-4">
                <Col>
                    <img
                        src="/images/imagenhome.jpeg"
                        alt="Welcome"
                        style={{maxWidth: '40%', height: 'auto'}}
                    />
                </Col>
            </Row>
            <Row className="text-center mb-4">
                <Col>
                    <p className="lead">
                        ¡Prepárate para un desafío emocionante con nuestra aplicación de trivia! Compite con amigos y
                        demuestra tus conocimientos en una variedad de categorías.
                    </p>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    <Button color="primary" size="lg" className="me-3 mb-3" href="/register">
                        Registrarse
                    </Button>
                    <Button color="success" size="lg" className="mb-3" href="/login">
                        Iniciar sesión
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
