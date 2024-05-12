import app from './app';

// Porta para o servidor escutar
const PORT = process.env.PORT || 3001;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
