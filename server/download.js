import ytdl from "@distube/ytdl-core";
import fs from 'fs';

export const download = (videoId) => {
    // construir a URL do vídeo do youtube
    const videoUrl = `https://www.youtube.com/watch?=v${videoId}`;
    console.log("Realizando o download do vídeo: ", videoId);

    return new Promise((resolve, reject) => {
        // verificar se a pasta "temp" existe, se não, criando ela
        if (!fs.existsSync('./temp')) {
            fs.mkdirSync('./temp');
        }

        let videoInfo = null;

        // inicia o donwload do vídeo, passando parâmetros de configuração
        ytdl(videoUrl, {
            quality: 'lowestaudio',
            filter: 'audioonly'
        })
        // evento disparado quando as informações do vídeo são obtidas
        .on("info", (info) => {
            videoInfo = info;
            console.log("Título do vídeo: ", info.videoDetails.title);
            const seconds = info.videoDetails.lengthSeconds;
            console.log("Duração do vídeo: ", seconds, " segundos");
        })
        // evento disparado se houver erro durante o download
        .on("error", (error) => { 
            console.error("Erro ao baixar o vídeo: ", error.message);
            reject(error);
        })
        // direcionamento do stream de áudio para um arquivo na pasta temp
        .pipe(fs.createWriteStream(`./temp/${videoId}.mp3`))
        // evento disparado quando o download e o salvamento são concluídos
        .on("finish", () => {
            consol.log("Donwload concluído com sucesso!");
            // resolvo a promisse com o caminho do arquivo e informações do vídeo
            resolve({
                audioPath: `./temp/${videoId}.mp3`,
                videoInfo: videoInfo
            })
        })
        .on("error", (error) => {
            console.error("Erro ao salvar o arquivo: ", error.message);
            reject(error);
        })
    })

}
