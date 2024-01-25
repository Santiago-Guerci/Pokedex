import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2";

//Home
app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Hola Mundo!" });
});

//Get list of 10 random pokemons in consecutive order
app.post("/page/:id", async (req, res) => {
  const id = req.params.id;
  const response = await axios.get(API_URL + `/pokemon/?limit=10&offset=${id}`);
  const data = response.data.results;
  // console.log(data);
  res.render("index.ejs", { title: "Lista de Pokemons", data: data });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
