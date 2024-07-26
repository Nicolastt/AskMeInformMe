import React from 'react';
import { Card, CardBody, Col, Container, Row, CardImg, CardTitle, CardText, Progress, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Score.css';

const Score = ({ userName, userImage, puntaje, totalTime }) => {
    // Format totalTime with two decimal places
    const formattedTime = totalTime.toFixed(2);

    // Define a maximum score for the progress bar
    const maxScore = 130;
    const scorePercentage = (puntaje / maxScore) * 100;

    const saveScore = async () => {
        try {
            const response = await fetch('/save_score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: userName,
                    puntaje: puntaje,
                    totalTime: totalTime
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error al guardar el puntaje:', errorData.error);
            } else {
                console.log('Puntaje guardado correctamente');
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <Container className="mt-4 score-container">
            <Row className="mb-4 justify-content-center">
                <Col md="12" className="text-center">
                    <h1 className="resultados-title mb-4">¡Felicidades, {userName}!</h1>
                    <p className="lead">¡Has hecho un gran trabajo! Aquí están tus resultados finales.</p>
                </Col>
            </Row>
            <Row className="mb-4 justify-content-center">
                <Col md="6" className="text-center">
                    <Card className="profile-card shadow-sm border-light">
                        <CardImg top src={userImage} alt="Usuario" className="img-usuario rounded-circle mx-auto mt-3" />
                        <CardBody>
                            <CardTitle tag="h4" className="user-name mb-2">{userName}</CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md="8">
                    <Card className="score-card shadow-lg text-center border-light">
                        <CardBody>
                            <CardText tag="h5" className="final-score mb-2">
                                <strong>Puntaje Final:</strong> <span className="text-success">{puntaje}</span>
                            </CardText>
                            <CardText tag="h5" className="total-time mb-3">
                                <strong>Tiempo Total:</strong> <span className="text-primary">{formattedTime} segundos</span>
                            </CardText>
                            <div className="progress-bar-container mb-3">
                                <strong>Progreso:</strong>
                                <Progress color="success" value={scorePercentage} />
                                <p className="progress-text">{puntaje} / {maxScore} puntos</p>
                            </div>
                            <Button color="success" className="mt-3 ms-2" onClick={saveScore}>
                                Volver al inicio
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Score;
