import React, { useState } from "react";
import { TextField, Button, Paper, Container } from "@mui/material";
import "./style.css";

const CriarTarefa = ({ adicionarTarefa }) => {
  const [novaNomeTarefa, setNovaNomeTarefa] = useState("");
  const [novaDescricaoTarefa, setNovaDescricaoTarefa] = useState("");

  const handleAdicionarTarefa = () => {
    if (novaNomeTarefa.trim() !== "") {
      adicionarTarefa({
        nome: novaNomeTarefa,
        descricao: novaDescricaoTarefa,
      });

      setNovaNomeTarefa("");
      setNovaDescricaoTarefa("");
    }
  };

  return (
    <Paper className="Paper">
      <Container className="inputs">
        <TextField
          label="Nova Tarefa"
          fullWidth
          value={novaNomeTarefa}
          onChange={(e) => setNovaNomeTarefa(e.target.value)}
          className="TextField"
        />
        <TextField
          label="Nova Descrição"
          fullWidth
          value={novaDescricaoTarefa}
          onChange={(e) => setNovaDescricaoTarefa(e.target.value)}
          style={{ marginTop: "10px" }}
          className="TextField"
        />
      </Container>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
        onClick={handleAdicionarTarefa}
        className="Button"
      >
        Adicionar Tarefa
      </Button>
    </Paper>
  );
};

export default CriarTarefa;
