import express from "express";

import multer from "multer";
import { Storage2API } from "./multer-custom-storage.js";

const app = express();
const url = 'http://localhost';
const port = 3000;

app.get("/", (_, res) => {
  res.writeHead(200, { Connection: "close" });
  res.end(`
      <html>
        <head></head>
        <body>
          <form method="POST" enctype="multipart/form-data">
            <input type="file" name="arquivo"><br />
            <input type="submit">
          </form>
        </body>
      </html>
    `);
});

const multerCustomStorage = new Storage2API();
const upload = multer({ storage: multerCustomStorage });

app.post("/", upload.single("arquivo"), (req, res) => {
  console.log(req.file);
  res.send(
    `<script>alert("Arquivo enviado!")</script>
    <p>Voltar ao inicio</p>
    <a href="/">Return</a>
    `
  );;
});

app.listen(port, () => {
  console.log(`API online no endereco ${url}:${port}`);
});