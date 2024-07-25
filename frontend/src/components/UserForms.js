import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';

export const Register = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementar lógica de registro
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="name">Nombre</Label>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="image">Imagen</Label>
                <Input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
            </FormGroup>
            <Button type="submit">Registrar</Button>
        </Form>
    );
};

export const Login = () => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementar lógica de inicio de sesión
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="name">Nombre</Label>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </FormGroup>
            <Button type="submit">Iniciar sesión</Button>
        </Form>
    );
};
