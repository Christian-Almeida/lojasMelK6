import moongose from "mongoose";

const ItemModeloDB = new moongose.Schema(
  {
    nome: { type: String, required: true, unique: true },
    descricao: { type: String, required: true },
  },
  { versionKey: false,
    toJSON:{
      transform: function(doc,ret){
        delete ret._id;
      }
    }
  }
);

export default moongose.model("Item", ItemModeloDB);
