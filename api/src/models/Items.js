import moongose from "mongoose";

const ItemModeloDB = new moongose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
  },
  { versionKey: false }
);

export default moongose.model("Item", ItemModeloDB);
