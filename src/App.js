import React, { useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  const handleAddTask = () => {
    if (newTaskName.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), name: newTaskName, steps: [], newStep: "" },
      ]);
      setNewTaskName("");
    }
  };

  const handleAddStep = (taskIndex) => {
    const updatedTasks = [...tasks];
    const taskToUpdate = updatedTasks[taskIndex];

    if (taskToUpdate.newStep.trim() !== "") {
      taskToUpdate.steps.push({ id: Date.now(), name: taskToUpdate.newStep });
      taskToUpdate.newStep = "";
      setTasks(updatedTasks);
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDeleteStep = (taskIndex, stepId) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].steps = updatedTasks[taskIndex].steps.filter(
      (step) => step.id !== stepId
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId, newName) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditStep = (taskIndex, stepId, newStepName) => {
    const updatedTasks = [...tasks];
    const updatedSteps = updatedTasks[taskIndex].steps.map((step) =>
      step.id === stepId ? { ...step, name: newStepName } : step
    );
    updatedTasks[taskIndex].steps = updatedSteps;
    setTasks(updatedTasks);
  };

  const renderSteps = (task, taskIndex) => {
    return (
      <ul style={{ marginTop: "10px" }}>
        {task.steps.map((step) => (
          <li key={step.id}>
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                const newStepName = prompt("Editar Etapa", step.name);
                if (newStepName !== null) {
                  handleEditStep(taskIndex, step.id, newStepName);
                }
              }}
            >
              {step.name}
            </span>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteStep(taskIndex, step.id)}
              style={{ marginLeft: "10px" }}
            >
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
        <li>
          <TextField
            label="Nova Etapa"
            fullWidth
            value={task.newStep || ""}
            onChange={(e) => {
              const updatedTasks = [...tasks];
              updatedTasks[taskIndex].newStep = e.target.value;
              setTasks(updatedTasks);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={() => handleAddStep(taskIndex)}
          >
            Adicionar Etapa
          </Button>
        </li>
      </ul>
    );
  };

  const renderTasks = () => {
    return tasks.map((task, index) => (
      <Paper key={task.id} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5">
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              const newName = prompt("Editar Tarefa", task.name);
              if (newName !== null) {
                handleEditTask(task.id, newName);
              }
            }}
          >
            {task.name}
          </span>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteTask(task.id)}
            style={{ marginLeft: "10px" }}
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
        <TextField
          label="Nova Etapa"
          fullWidth
          value={task.newStep || ""}
          onChange={(e) => {
            const updatedTasks = [...tasks];
            updatedTasks.find((t) => t.id === task.id).newStep = e.target.value;
            setTasks(updatedTasks);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={() => {
            handleAddStep(index);
            const updatedTasks = [...tasks];
            updatedTasks.find((t) => t.id === task.id).newStep = "";
            setTasks(updatedTasks);
          }}
        >
          Adicionar Etapa
        </Button>
        {renderSteps(task, index)}
      </Paper>
    ));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Task Manager</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={{ padding: "20px" }}>
              <TextField
                label="Nova Tarefa"
                fullWidth
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                onClick={handleAddTask}
              >
                Adicionar Tarefa
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {renderTasks()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
