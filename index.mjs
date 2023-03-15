import { promises as fs } from 'fs';
import http from 'http';
import express from 'express';
import cors from 'cors';
import download, { getLibrary } from './youtube.mjs';
import { PORT } from "./global.mjs";

// expires on 2022-10-13
// const cert = fs.readFileSync('private/fullchain.pem');
// const key = fs.readFileSync('private/privkey.pem');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.get('/', async (req, res) => {
    const library = getLibrary();
    await fs.writeFile("music.json", JSON.stringify(library));
    res.json(library);
});

app.post('/', async (req, res) => {
    await download(req, res);
});

app.delete('/', (req, res) => {
    // todo later 
}); 

http.createServer(app).listen(process.env.PORT || PORT);
// console.log(process.env.PORT) // TODO: