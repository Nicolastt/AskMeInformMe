import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Spinner } from 'reactstrap';

const PuntajesAltos = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/get_high_scores')
            .then(response => response.json())
            .then(data => {
                setScores(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar los puntajes');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner color="primary">Cargando puntajes...</Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <p>{error}</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="text-center mb-4">
                <Col>
                    <h1>Puntajes Más Altos</h1>
                </Col>
            </Row>
            <Row>
                {scores.map((score, index) => (
                    <Col md="6" lg="4" key={index} className="mb-4">
                        <Card className="shadow-sm">
                            <CardBody>
                                <CardTitle tag="h5">{index + 1}. {score.Nombre}</CardTitle>
                                <CardText><strong>Puntaje:</strong> {score.Puntaje}</CardText>
                                <CardText><strong>Tiempo Total:</strong> {score.Tiempo_Total.toFixed(2)} segundos</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PuntajesAltos;
