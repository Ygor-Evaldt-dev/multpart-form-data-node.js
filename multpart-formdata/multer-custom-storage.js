export class Storage2API {
    _handleFile(req, file, cb) {
        // Pega o nome original do arquivo postado e também
        // o objeto readable para termos acesso aos chunks
        // do arquivo
        const { originalname, stream: readable } = file;

        // Sempre que um "pedaço" (chunk) do arquivo for
        // recebido, o método abaixo será executado.
        // Este ciclo permanecerá até que todos os bytes
        // do arquivo sejam recebidos
        readable.on("data", (chunk) => {
            console.log(`Chunk recebido: ${chunk.length} bytes`);
        });

        // Quando todos os bytes forem recebidos, o
        // método abaixo será executado:
        readable.on("end", () => {
            console.log(`${originalname}: bytes recebidos`);

            // "Avisamos" ao multer que os dados foram
            // processados.
            cb(null, {
                mensagem: "Bytes recebidos",
            });
        });
    }
}