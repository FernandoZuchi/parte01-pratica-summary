import cors from 'cors';
import express, { request, response } from 'express';

const app = express();

app.use(cors());

app.get('/summary', async (request, response) => {
    response.json({
        message: 'Olá! Este é o endpoint de resumo. Envie seu texto para obter um resumo.',
    })
});

// inicializar o servidor na porta desejadaa
app.listen(3333, () => {
    console.log('Servidor rodando na porta http://localhost:3333');
})