import { server } from "./server.js";

const form = document.querySelector("#form");
const input = document.querySelector("#url");
const content = document.querySelector("#content");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const videoUrl = input.value;

    if (!videoUrl.includes("shorts"))
    {
        content.textContent = "Esse vídeo não parece ser um Youtube Shorts.";
        content.className = "error";
        return;
    }

    // videoUrl = https://www.youtube.com/shorts/?si=chrmZyitp-A
    // parte1 = https://www.youtube.com/shorts/
    // parte2 = ?si=chrmZyitp-A

    const [_, params] = videoUrl.split("/shorts/");
    const [videoId] = params.split("?si")

    content.textContent = "🎬 Baixando vídeo... 🎤 Transcrevendo com IA... 🧠 Resumindo...";
    content.className = "loading";

    try {
        const response = await server.get("/summary/" + videoId);

        // exibir o titulço do video e o resumo
        const title = response.data.videoTitle || "Vídeo";
        const summary = response.data.result;

        content.innerHTML = `
            <strong>Título: </strong> ${title}
            <strong>Resumo: </strong> ${summary}
        `;
        content.className = "";

        console.log("Resumo criado com IA com sucesso:", summary);
    } catch (error) {
        console.log("Erro ao criar resumo:", error.message);
    }
})