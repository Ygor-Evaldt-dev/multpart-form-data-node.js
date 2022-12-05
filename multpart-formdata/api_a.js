import express from "express";
import multer from "multer";

const app = express();
const url = 'http://localhost';
const port = 4000;
app.use(express.json());

// ********************************************************
// Quando informamos o "dest", o multer cria uma instância
// do DiskStorage.
// Trecho do arquivo index.js do multer:
//
//  if (options.storage) {
//    this.storage = options.storage
//  } else if (options.dest) {
//    this.storage = diskStorage({ destination: options.dest })
//  } else {
//    this.storage = memoryStorage()
//  }
//
// https://github.com/expressjs/multer/blob/master/index.js
// ********************************************************
const upload = multer({
    dest: "./",
});

app.post("/", upload.single("arquivo"), (req, res) => {
    res.json({
        mensagem: "Arquivo salvo com sucesso",
        detalhes: req.file,
    });
});

app.listen(port, () => {
    console.log(`API online no endereco ${url}:${port}`);
});