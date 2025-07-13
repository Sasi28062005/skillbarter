// src/components/ProfileSetup.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const ProfileSetup = () => {
  const [profile, setProfile] = useState({ skillsToTeach: "", skillsToLearn: "" });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/profile", profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Set Up Your Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Skills to Teach" name="skillsToTeach" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Skills to Learn" name="skillsToLearn" onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">Save Profile</Button>
      </form>
    </Container>
  );
};

export default ProfileSetup;
