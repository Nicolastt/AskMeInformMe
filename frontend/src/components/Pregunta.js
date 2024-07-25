import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, CardBody, Col, Container, Row} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Pregunta.css';
import Score from './Score';

const Pregunta = ({userImage, userName}) => {
    const tiempo_pregunta = 15;
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [preguntas, setPreguntas] = useState([]);
    const [puntaje, setPuntaje] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
    const [tiempoRestante, setTiempoRestante] = useState(tiempo_pregunta);
    const [isPaused, setIsPaused] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        fetch('/get_questions')
            .then(response => response.json())
            .then(data => {
                setPreguntas(data);
            });
    }, []);

    useEffect(() => {
        if (tiempoRestante === 0) {
            setRespuestaCorrecta(preguntas[preguntaActual]?.opciones.find(opcion => opcion.Es_Correcta));
        }
    }, [tiempoRestante, preguntaActual, preguntas]);

    useEffect(() => {
        let interval = null;

        if (!isPaused && !finalizado) {
            interval = setInterval(() => {
                setTiempoRestante(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 0.1; // Reduce tiempo en 0.1 segundos
                    } else {
                        clearInterval(interval);
                        return 0;
                    }
                });
            }, 100); // Actualización cada 0.10 segundos
        } else if (isPaused || finalizado) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isPaused, finalizado]);

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
        setTotalTime(totalTime + (tiempo_pregunta - tiempoRestante));
        if (preguntaActual + 1 < preguntas.length) {
            setRespuestaSeleccionada(null);
            setRespuestaCorrecta(null);
            setPreguntaActual(preguntaActual + 1);
            setTiempoRestante(tiempo_pregunta); // Actualiza dinámicamente según la dificultad
            setIsPaused(false);
        } else {
            setFinalizado(true);
        }
    };

    if (preguntas.length === 0) {
        return <div>Cargando preguntas...</div>;
    }

    if (finalizado) {
        return <Score userName={userName} userImage={userImage} puntaje={puntaje} totalTime={totalTime}/>;
    }

    // Calculate the progress as a percentage of the original duration
    const progressPercentage = (tiempoRestante / tiempo_pregunta) * 100; // Calculate remaining time as percentage

    // Calculate thresholds for color changes
    const threshold1 = (tiempo_pregunta / 3) * 2;
    const threshold2 = tiempo_pregunta / 3;

    // Determine color based on the remaining time
    const getProgressColor = (remainingTime) => {
        if (remainingTime > threshold1) {
            return '#48c448'; // Green
        } else if (remainingTime > threshold2) {
            return '#f3f352'; // Yellow
        } else {
            return '#e04040'; // Red
        }
    };

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
                    <div style={{width: '100%', position: 'relative'}}>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '5px',
                                backgroundColor: getProgressColor(tiempoRestante),
                                transition: 'transform 0.1s linear', // Adjusted transition for smoother animation
                                transform: `scaleX(${progressPercentage / 100})`,
                                transformOrigin: 'left', // Change to left to make the progress decrease from left to right
                                zIndex: 1,
                            }}
                        />
                        <div className="text-center mt-2"
                             style={{fontSize: '24px', fontWeight: 'bold', position: 'relative', zIndex: 2}}>
                            {Math.ceil(tiempoRestante)}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Pregunta;
