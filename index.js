import express from "express";
import axios from "axios";
import Pokemon from "./Pokemon.js";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2";

app.use(express.static("public"));

//Home
app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Hola Mundo!" });
});

//Get list of 10 random pokemons in consecutive order
app.post("/page/:id", async (req, res) => {
  const pokeArray = [];
  const id = req.params.id;
  const response = await axios.get(API_URL + `/pokemon/?limit=10&offset=${id}`);
  const data = response.data.results;

  for (let i = 0; i < data.length; i++) {
    const petition = await axios.get(data[i].url);
    const pokeData = petition.data;

    const pokemon = new Pokemon(pokeData.id, pokeData.name, pokeData.types, pokeData.sprites.front_default);
    pokeArray.push(pokemon);
  }

  res.render("index.ejs", { title: "Lista de Pokemons", pokeArray: pokeArray });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
