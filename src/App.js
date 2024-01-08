// App.js

import React, { useState } from "react";
import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";

import "./App.css";
import CriarTarefa from "./componets/CriarTarefa";
import TarefaCard from "./componets/TarefaCard";

function App() {
  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = (novaTarefa) => {
    setTarefas([
      ...tarefas,
      {
        id: Date.now(),
        nome: novaTarefa.nome,
        passos: [],
        novoPasso: "",
        descricao: novaTarefa.descricao,
      },
    ]);
  };

  const deletarTarefa = (tarefaId) => {
    const tarefasAtualizadas = tarefas.filter(
      (tarefa) => tarefa.id !== tarefaId
    );
    setTarefas(tarefasAtualizadas);
  };

  const renderizarTarefas = () => {
    return tarefas.map((tarefa, index) => (
      <TarefaCard
        key={tarefa.id}
        tarefa={tarefa}
        indice={index}
        deletarTarefa={deletarTarefa}
        tarefas={tarefas}
        setTarefas={setTarefas}
      />
    ));
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gerenciador de Tarefas</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CriarTarefa adicionarTarefa={adicionarTarefa} />
          </Grid>
          <Grid item xs={12}>
            {renderizarTarefas()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
