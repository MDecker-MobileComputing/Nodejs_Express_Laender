import express from "express";



const app = new express();

app.use(express.json());

const PORT_NUMMER = 8080;
app.listen(PORT_NUMMER, () => {
    console.log(`Web-Server lauscht auf Port ${PORT_NUMMER}.\n`);
});