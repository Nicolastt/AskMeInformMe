import React, { useState, useEffect } from 'react';
import {Card, CardBody, CardTitle, CardText, CardFooter, Col, Row, Spinner, CardImg} from 'reactstrap';
import axios from 'axios';

const DatosCuriosos = ({ questionId }) => {
    const [datoCurioso, setDatoCurioso] = useState(null);

    useEffect(() => {
        if (questionId) {
            axios.get(`/datos_curiosos/${questionId}`)
                .then(response => {
                    setDatoCurioso(response.data);
                })
                .catch(error => {
                    console.error('Error fetching dato curioso:', error);
                });
        }
    }, [questionId]);

    if (!datoCurioso) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Spinner color="dark" type="grow">
                    Loading...
                </Spinner>
            </div>
        );
    }

    return (
        <Row className="mt-4">
            <Col sm="6">
                <Card>
                    <CardBody>
                        <CardTitle tag="h3">Dato Curioso</CardTitle>
                        <CardText>{datoCurioso.texto}</CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="6">
                <Card>
                    <CardBody>
                        <CardTitle tag="h4">Enlaces</CardTitle>
                        <ul>
                            <li>
                                <a href={datoCurioso.enlace1} target="_blank" rel="noopener noreferrer">
                                    <CardText className="text-primary">{datoCurioso.enlace1}</CardText>
                                </a>
                            </li>
                            <li>
                                <a href={datoCurioso.enlace2} target="_blank" rel="noopener noreferrer">
                                    <CardText className="text-primary">{datoCurioso.enlace2}</CardText>
                                </a>
                            </li>
                            <li>
                                <a href={datoCurioso.enlace3} target="_blank" rel="noopener noreferrer">
                                    <CardText className="text-primary">{datoCurioso.enlace3}</CardText>
                                </a>
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default DatosCuriosos;
