import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="text-center mb-4">Bienvenido a AskMeInformMe</h1>
                    <p className="text-center mb-4">
                        ¡Bienvenido a nuestra aplicación de trivia! Aquí podrás jugar a un emocionante juego de
                        preguntas y respuestas.
                    </p>
                    <div className="text-center">
                        <Button color="primary" href="/register" className="me-2">
                            Registrarse
                        </Button>
                        <Button color="secondary" href="/login">
                            Iniciar sesión
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
