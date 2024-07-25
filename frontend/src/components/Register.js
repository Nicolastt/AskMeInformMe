import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
          setTimeout(() => navigate('/'), 2000);
        }
      })
      .catch(() => setError('An unexpected error occurred'));
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="shadow-lg">
            <CardBody>
              <CardTitle tag="h2" className="text-center mb-4">Register</CardTitle>
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
                <Button type="submit" color="primary" className="mr-2 mb-3" block>Register</Button>
                <Button type="button" color="secondary" onClick={handleGoBack} block>Go Back</Button>
              </Form>
              {message && <Alert color="success" className="mt-3">{message}</Alert>}
              {error && <Alert color="danger" className="mt-3">{error}</Alert>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { Register };
