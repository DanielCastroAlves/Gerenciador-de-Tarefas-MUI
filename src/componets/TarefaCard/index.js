import React from "react";
import { Paper, Typography, IconButton, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./style.css";

const TarefaCard = ({ tarefa, deletarTarefa }) => {
  return (
    <Paper className="card" key={tarefa.id}>
      <Container className="title-description">
        <Typography variant="h5">
          {" "}
          <h3>Tarefa: {tarefa.nome}</h3>
        </Typography>

        {tarefa.descricao && (
          <Typography className="description">
            <strong>Descrição:</strong> {tarefa.descricao}
          </Typography>
        )}
      </Container>

      <IconButton
        aria-label="delete"
        onClick={() => deletarTarefa(tarefa.id)}
        style={{ marginLeft: "10px" }}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default TarefaCard;
