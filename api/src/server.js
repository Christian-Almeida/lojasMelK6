import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/database.js";
import itemsRoutes from "./routes/itemRoutes.js";
import express from "express";

dotenv.config({ path: "./src/.env" });

//Iniciar banco de dado
conectarDB();

const app = express();
const PORT = process.env.PORT || 3400;

//Middleware
app.use(express.json());  
app.use(
  cors({
    origin: "*", // Permite todas as origens (modifique se necessário)
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);
app.use("/api", itemsRoutes);


app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});
