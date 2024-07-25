import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/login_user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
        setMessage('');
      } else {
        onLogin(data.imagePath);  // Pasa la ruta de la imagen al componente App
        setMessage('Login successful');
        setError('');
        // Redirige a la página de preguntas después de iniciar sesión exitosamente
        setTimeout(() => navigate('/pregunta'), 2000); // Redirige después de 2 segundos para que el mensaje sea visible
      }
    })
    .catch(() => {
      setError('An unexpected error occurred');
      setMessage('');
    });
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Login</Button>
        {message && <Alert color="success">{message}</Alert>}
        {error && <Alert color="danger">{error}</Alert>}
      </Form>
    </Container>
  );
};

export default Login;
