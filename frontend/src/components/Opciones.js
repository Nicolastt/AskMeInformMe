import React from 'react';
import { Col, Button, Row } from 'reactstrap';
import '../css/Opciones.css';

const Opciones = ({ opciones, respuestaSeleccionada, handleRespuestaSeleccionada, respuestaCorrecta }) => {
    return (
        <Row>
            {opciones.map((opcion, index) => (
                <Col xs="6" className="mb-3" key={index}>
                    <Button
                        className={`opcion-button opcion-button-${index + 1} ${respuestaSeleccionada && respuestaSeleccionada.ID === opcion.ID ? '' : ''}`}
                        onClick={() => handleRespuestaSeleccionada(opcion)}
                        disabled={respuestaCorrecta !== null}
                        block
                    >
                        <span className="opcion-text">{String.fromCharCode(65 + index)}. {opcion.Texto}</span>
                    </Button>
                </Col>
            ))}
        </Row>
    );
};

export default Opciones;
