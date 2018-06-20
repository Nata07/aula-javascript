var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var produtoschema = mongoose.Schema({
  nome : String,
  descricao: String,
  valor: Number,
  criado_em: Date,
  alterado_em: Date
  
});
var Produto = mongoose.model('produtos', produtoschema);

/* GET produtos listing. */
router.get('/', function(req, res, next) {
  Produto.find({}).exec((err, produtos) => {
    res.json(produtos);
  });
});
router.put('/:id', function(req, res) {
  var produto = req.body;
  produto.alterado_em = new Date();
  Produto.update({_id: req.params.id}, req.body, function(err, data) {
    res.json({message: 'Alterado'});
  });
});
router.delete('/:id', function(req, res) {
  Produto.remove({_id: req.params.id}, function(err, data) {
    res.json({message: 'Removido'});
  });
});
router.post('/', function(req, res, next) {

  if (!req.body.descricao || !req.body.valor){
    res.json({message: 'INVALIDO'});
    return;
  }
  var produto = new Produto(req.body);
  produto.criado_em = new Date();
  produto.alterado_em = new Date();  
  produto.save(err => {
    res.json({message: 'Criado'});
  });
});

module.exports = router;
