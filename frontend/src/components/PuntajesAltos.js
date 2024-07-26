import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardImg, CardTitle, Col, Container, Row, Spinner, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/PuntajesAltos.css';

const PuntajesAltos = ({ userName, userImage }) => {
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

    // Identificar el usuario con el puntaje más alto
    const topScore = scores[0] || {}; // Primer elemento o un objeto vacío si no hay puntajes

    // Construir la URL de la imagen del usuario con el puntaje más alto
    const topScoreImage = topScore.RutaImagen ? `http://localhost:5000/uploads/${topScore.RutaImagen}` : userImage;

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner color="primary" style={{ width: '3rem', height: '3rem' }}>Cargando puntajes...</Spinner>
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
                    <h3 className="font-weight-bold" style={{color: 'black', fontSize: '2rem'}}>
                        ¡Puntajes Más Altos!
                    </h3>
                </Col>
            </Row>

            <Row className="mb-4 justify-content-center">
                <Col md="6" className="text-center">
                    <Card className="profile-card shadow-sm border-light">
                        <CardImg top src={topScoreImage} alt="Usuario" className="img-usuario rounded-circle mx-auto mt-3" />
                        <CardBody>
                            <CardTitle tag="h4" className="user-name mb-2">{topScore.Nombre || userName}</CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md="10">
                    <Table hover responsive className="shadow-lg rounded">
                        <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Puntaje</th>
                                <th>Tiempo Total (s)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score, index) => (
                                <tr key={index} className={index === 0 ? 'top1' : ''}>
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
            <Row className="mt-4">
                <Col className="text-center">
                    <Button color="dark" href="/">
                        Volver al Inicio
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default PuntajesAltos;
