import Item from "../models/Items.js";

//Crud
//Criar um novo item(Create)
export const criarItem = async (req, res) => {
  try {
    const ItemExistete = await Item.findOne({ nome: req.body.nome })

    if (ItemExistete) {
      return res.status(400).json({ error: "Item já cadastrado" })
    }

    const novoItem = new Item(req.body);
    await novoItem.save();

    res.status(201).json(novoItem);
  }

 catch (error) {
    res.status(400).json({ error: "Erro ao criar um novo item" });
    res.body;
  }
};

//Listar todos os itens(Read)
export const listarItens = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } 

  catch (error) {
    res.status(500).json({ error: "Erro ao listar os itens" });
  }
};

//Atualizar um item(Update)
export const atualizarItem = async (req, res) => {
  try {
    const itemAtualizado = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!itemAtualizado)
      return res.status(404).json({ error: "Item não encontrado" });
    res.json(itemAtualizado);
  }
  catch (error) {
    res.status(400).json({ error: "Erro ao atualizar item" });
  }
};

//Excluir um item(Delete)
export const deletarItem = async (req, res) => {
  try {
    const itemDeletado = await Item.findByIdAndDelete(req.params.id);
    if (!itemDeletado)
      return res.status(404).json({ error: "Item não encontrado" });
    res.json({ message: "Item deletado com sucesso" });
  }
  catch (error) {
    res.status(500).json({ error: "Erro ao deletar item" });
  }
};
