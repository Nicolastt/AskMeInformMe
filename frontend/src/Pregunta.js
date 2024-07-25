import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardTitle, CardText, Container, Row, Col, Alert } from 'reactstrap';

const Pregunta = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        axios.get('/get_questions')
            .then(response => {
                setPreguntas(response.data);
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
            });
    }, []);

    const handleOptionClick = (isCorrect) => {
        setSelectedOption(isCorrect);
        setShowResult(true);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowResult(false);
    };

    if (preguntas.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = preguntas[currentQuestionIndex];

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md="8">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h3">{currentQuestion.texto}</CardTitle>
                            <CardText>
                                {currentQuestion.opciones.map((opcion, index) => (
                                    <Button
                                        key={index}
                                        color="primary"
                                        className="m-2"
                                        onClick={() => handleOptionClick(opcion.es_correcta)}
                                        disabled={showResult}
                                    >
                                        {opcion.texto}
                                    </Button>
                                ))}
                            </CardText>
                            {showResult && (
                                <Alert color={selectedOption ? "success" : "danger"}>
                                    {selectedOption ? "¡Correcto!" : "Incorrecto"}
                                </Alert>
                            )}
                            {showResult && currentQuestionIndex < preguntas.length - 1 && (
                                <Button color="secondary" onClick={handleNextQuestion}>Siguiente Pregunta</Button>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Pregunta;
