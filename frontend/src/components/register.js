// src/components/Register.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" type="email" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </Container>
  );
};

export default Register;
