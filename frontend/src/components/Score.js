import React from 'react';
import { Card, CardBody, Col, Container, Row, CardImg, CardTitle, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Score.css';

const Score = ({ userName, userImage, puntaje, totalTime }) => {
    return (
        <Container className="mt-4 score-container">
            <Row className="mb-4 justify-content-center">
                <Col md="12" className="text-center">
                    <h1 className="resultados-title">Resultados</h1>
                    <h2 className="user-name mt-3">{userName}</h2>
                </Col>
            </Row>
            <Row className="mb-4 justify-content-center">
                <Col md="6" className="text-center">
                    <Card className="profile-card">
                        <CardImg top src={userImage} alt="Usuario" className="img-usuario rounded-circle mx-auto mt-3" />
                        <CardBody>
                            <CardTitle tag="h4" className="user-name">{userName}</CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md="8">
                    <Card className="score-card shadow-sm text-center">
                        <CardBody>
                            <CardText tag="h4" className="final-score">
                                <strong>Puntaje Final:</strong> <span className="text-success">{puntaje}</span>
                            </CardText>
                            <CardText tag="h4" className="total-time">
                                <strong>Tiempo Total:</strong> <span className="text-primary">{totalTime} segundos</span>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Score;
