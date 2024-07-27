import React, {useEffect, useState} from 'react';
import {Alert, Badge, Button, Card, CardBody, Col, Container, Row, Spinner} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Pregunta.css';
import Score from './Score';
import DatosCuriosos from './DatosCuriosos';
import Barra from './Barra';
import Opciones from './Opciones';

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
    const [mostrarDatoCurioso, setMostrarDatoCurioso] = useState(false);

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
            setMostrarDatoCurioso(true); // Mostrar el dato curioso cuando el tiempo se acaba
            setIsPaused(true); // Pausar el temporizador
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
        setMostrarDatoCurioso(true);
    };

    /*
    const siguientePregunta = () => {
    setTotalTime(totalTime + (tiempo_pregunta - tiempoRestante));
    if (preguntaActual + 1 < preguntas.length) {
        setRespuestaSeleccionada(null);
        setRespuestaCorrecta(null);
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(tiempo_pregunta);
        setIsPaused(false);
        setMostrarDatoCurioso(false);
    } else {
        setFinalizado(true);
    }
};
*/
    const siguientePregunta = () => {
    setTotalTime(totalTime + (tiempo_pregunta - tiempoRestante));
    if (Math.random() < 0.5) { // ! Introducir bug: Ocasionalmente no avanzar a la siguiente pregunta
        if (preguntaActual + 1 < preguntas.length) {
            setRespuestaSeleccionada(null);
            setRespuestaCorrecta(null);
            setPreguntaActual(preguntaActual + 1);
            setTiempoRestante(tiempo_pregunta);
            setIsPaused(false);
            setMostrarDatoCurioso(false);
        } else {
            setFinalizado(true);
        }
    }
};

    if (preguntas.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Spinner color="primary">
                    Cargando preguntas...
                </Spinner>
            </div>
        );
    }

    if (finalizado) {
        return <Score userName={userName} userImage={userImage} puntaje={puntaje} totalTime={totalTime}/>;
    }

    function handleGoBack() {
        window.location.href = '/bug-1'; // ! Introducir bug: Redirigir a una ruta incorrecta
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
                            <Opciones
                                opciones={preguntas[preguntaActual]?.opciones}
                                respuestaSeleccionada={respuestaSeleccionada}
                                handleRespuestaSeleccionada={handleRespuestaSeleccionada}
                                respuestaCorrecta={respuestaCorrecta}
                            />
                            {respuestaCorrecta && (
                                <div className="mt-3">
                                    {respuestaSeleccionada?.ID === respuestaCorrecta.ID ? (
                                        <Alert color="success">
                                            ¡Correcto!
                                        </Alert>
                                    ) : (
                                        <Alert color="danger">
                                            Incorrecto. La respuesta correcta es: {respuestaCorrecta.Texto}
                                        </Alert>
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
            <Barra tiempoRestante={tiempoRestante} tiempoPregunta={tiempo_pregunta}/> {}
            <Button color="dark" onClick={handleGoBack}>
                Salir
            </Button>
            {mostrarDatoCurioso && (
                <Row className="mt-4">
                    <Col>
                        <DatosCuriosos questionId={preguntas[preguntaActual]?.ID}/>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Pregunta;
