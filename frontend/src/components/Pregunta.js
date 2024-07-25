import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, CardBody, Col, Container, Row} from 'reactstrap';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Pregunta.css';

const Pregunta = ({userImage}) => {
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [preguntas, setPreguntas] = useState([]);
    const [puntaje, setPuntaje] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        fetch('/get_questions')
            .then(response => response.json())
            .then(data => {
                setPreguntas(data);
            });
    }, []);

    useEffect(() => {
        if (preguntas.length > 0 && !isPaused) {
            setRespuestaCorrecta(null); // Resetea la respuesta correcta al cambiar de pregunta
        }
    }, [isPaused, preguntaActual, preguntas]);

    const handleRespuestaSeleccionada = (respuesta) => {
        setRespuestaSeleccionada(respuesta);
        setIsPaused(true);
        const correcta = preguntas[preguntaActual]?.opciones.find(opcion => opcion.Es_Correcta);

        if (respuesta.ID === correcta?.ID) {
            if (preguntas[preguntaActual]?.Dificultad === 'Fácil') {
                setPuntaje(puntaje + 10);
            } else if (preguntas[preguntaActual]?.Dificultad === 'Media') {
                setPuntaje(puntaje + 20);
            } else if (preguntas[preguntaActual]?.Dificultad === 'Difícil') {
                setPuntaje(puntaje + 30);
            }
        }

        setRespuestaCorrecta(correcta);
    };

    const siguientePregunta = () => {
        setRespuestaSeleccionada(null);
        setRespuestaCorrecta(null);
        setPreguntaActual(preguntaActual + 1);
        setIsPaused(false);
    };

    if (preguntas.length === 0) {
        return <div>Cargando preguntas...</div>;
    }

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2>Pregunta {preguntaActual + 1}</h2>
                        <Badge color="primary">{preguntas[preguntaActual]?.Categoria}</Badge>
                    </div>
                    <div>
                        <img src={userImage} alt="Usuario" className="img-usuario"/>
                    </div>
                    <div>
                        <h3>Puntaje: {puntaje}</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <div className="mb-4">
                                <h4>{preguntas[preguntaActual]?.Texto}</h4>
                            </div>
                            <Row>
                                {preguntas[preguntaActual]?.opciones.map((opcion, index) => (
                                    <Col xs="6" className="mb-3" key={index}>
                                        <Button
                                            color={respuestaSeleccionada && respuestaSeleccionada.ID === opcion.ID ? 'primary' : 'secondary'}
                                            onClick={() => handleRespuestaSeleccionada(opcion)}
                                            disabled={respuestaCorrecta !== null}
                                            block
                                        >
                                            {String.fromCharCode(65 + index)}. {opcion.Texto}
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                            {respuestaCorrecta && (
                                <div className="mt-3">
                                    {respuestaSeleccionada?.ID === respuestaCorrecta.ID ? (
                                        <h5 className="text-success">¡Correcto!</h5>
                                    ) : (
                                        <h5 className="text-danger">Incorrecto. La respuesta correcta
                                            es: {respuestaCorrecta.Texto}</h5>
                                    )}
                                    <Button color="primary" onClick={siguientePregunta}>
                                        Siguiente Pregunta
                                    </Button>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                    <CountdownCircleTimer
                        isPlaying={!isPaused}
                        duration={30}
                        colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000', 0.33]]}
                        key={preguntaActual} // Esto reinicia el temporizador cada vez que cambie la pregunta
                        onComplete={() => {
                            setIsPaused(true);
                            const correcta = preguntas[preguntaActual]?.opciones.find(opcion => opcion.Es_Correcta);
                            setRespuestaCorrecta(correcta);
                        }}
                    >
                        {({remainingTime}) => remainingTime}
                    </CountdownCircleTimer>
                </Col>
            </Row>
        </Container>
    );
};

export default Pregunta;
