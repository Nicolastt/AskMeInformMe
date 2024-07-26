import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Spinner } from 'reactstrap';

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
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Puntaje</th>
                                <th>Tiempo Total (segundos)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{score.Nombre}</td>
                                    <td>{score.Puntaje}</td>
                                    <td>{score.Tiempo_Total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default PuntajesAltos;
