var express = require('express');
var router = express.Router();

var urlService = require('./url_service.js');

// Retorna 301 redirect para o endereço original da URL
//router.get('/urls/:id', urlService.getUrlById);
// Cadastra nova url
router.post('/users/:userid/urls', urlService.createUrl);
// Retorna estatisticas globais
router.get('/stats', urlService.getStats);
// // Retorna estatisticas por usuario
// router.get('/users/:userid/stats', urlService.getStatsByUser);
// // Retorna estatisticas por url
// router.get('/stats/:id', urlService.getStatsByUrl);
// Exclui uma url
router.delete('/urls/:id', urlService.deleteUrl);
// Cadastra novo usuario
router.post('/users', urlService.createUser);
// Exclui um usuario
router.delete('/user/:userid', urlService.deleteUser);
// Retorna usuarios
router.get('/users', urlService.getUsers);

module.exports = router;