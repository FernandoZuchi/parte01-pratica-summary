import cors from "cors";
import express, { request, response } from "express";
import { download } from "./download.js";

const app = express();

app.use(cors());

app.get("/summary/:id", async (request, response) => {
  try {
    console.log('Iniciando o processamento do vídeo: ', request.params.id);
    
    // chama a função download, passando o ID do vídieo obtido do frontend
    const downloadResult = await download(request.params.id);
    const { audioPath, videoInfo } = downloadResult;

    // trascrever o áudio usando OpenAI Whisper


    // resumir o conteudo usando OpenAI GPT
    
  } catch (error) {
    console.error('Erro ao processar o vídeo:', error.message);
  }
});

// inicializar o servidor na porta desejadaa
app.listen(3333, () => {
  console.log("Servidor rodando na porta http://localhost:3333");
});
