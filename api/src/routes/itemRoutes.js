import express from 'express'
import {criarItem, listarItens, atualizarItem, deletarItem} from './../controllers/ItemControllers.js';

const router = express.Router();

//definição das rotas
router.post('/items',criarItem);
router.get('/items',listarItens);
router.put('/items/:id',atualizarItem);
router.delete('/items/:id',deletarItem);

export default router;
