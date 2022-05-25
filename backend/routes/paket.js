//import auth
// const auth = require("../auth")
// const jwt = require("jsonwebtoken")
// const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const paket = model.paket

//endpoint menampilkan semua data paket, method: GET, function: findAll()
app.get("/", (req,res) => {
    paket.findAll()
        .then(result => {
            res.json({
                paket : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//menampilkan data paket berdasarkan id
app.get("/:id_paket", (req, res) =>{
    paket.findOne({ where: {id_paket: req.params.id_paket}})
    .then(result => {
        res.json({
            paket: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data paket, METHOD: POST, function: create
app.post("/", (req,res) => {
    let data = {
        id_outlet : req.body.id_outlet,
        jenis : req.body.jenis,
        nama_paket : req.body.nama_paket,
        harga : req.body.harga
    }

    paket.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint mengupdate data paket, METHOD: PUT, function:update
app.put("/:id", (req,res) => {
    let param = {
        id_paket : req.params.id
    }
    let data = {
        id_outlet : req.body.id_outlet,
        jenis : req.body.jenis,
        nama_paket : req.body.nama_paket,
        harga : req.body.harga
    }
    paket.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menghapus data paket, METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_paket : req.params.id
    }
    paket.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})


module.exports = app