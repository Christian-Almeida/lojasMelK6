import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "../src/config/.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Banco de dados Connectado!!!");
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados", error);
    process.exit(1);
  } 
};

export default conectarDB;
