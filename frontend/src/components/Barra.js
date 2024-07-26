// Barra.js
import React from 'react';
import { Col, Row } from 'reactstrap';

const Barra = ({ tiempoRestante, tiempoPregunta }) => {
    // Calculate the progress as a percentage of the original duration
    const progressPercentage = (tiempoRestante / tiempoPregunta) * 100; // Calculate remaining time as percentage

    // Calculate thresholds for color changes
    const threshold1 = (tiempoPregunta / 3) * 2;
    const threshold2 = tiempoPregunta / 3;

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
    );
};

export default Barra;
