import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !imageFile) {
      setError('Name and image file are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageFile);

    fetch('/register_user', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
        setMessage('');
      } else {
        setMessage(data.message);
        setError('');
        // Redirige a HomePage después de la creación exitosa
        setTimeout(() => navigate('/'), 2000); // Redirige después de 2 segundos para que el mensaje sea visible
      }
    })
    .catch(() => setError('An unexpected error occurred'));
  };

  return (
    <Container>
      <h2>Register</h2>
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
        <FormGroup>
          <Label for="image">Image</Label>
          <Input
            type="file"
            id="image"
            onChange={handleFileChange}
            required
          />
        </FormGroup>
        <Button type="submit">Register</Button>
        {message && <Alert color="success">{message}</Alert>}
        {error && <Alert color="danger">{error}</Alert>}
      </Form>
    </Container>
  );
};

export { Register };
