import React from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Score = ({userName, userImage, puntaje, totalTime}) => {
    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2>Resultados</h2>
                    </div>
                    <div>
                        <img src={userImage} alt="Usuario" className="img-usuario"/>
                    </div>
                    <div>
                        <h3>{userName}</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <div className="mb-4">
                                <h4>Puntaje Final: {puntaje}</h4>
                            </div>
                            <div className="mb-4">
                                <h4>Tiempo Total: {totalTime} segundos</h4>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Score;
