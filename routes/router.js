var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../app/models/user');
const User = mongoose.model('user');

// User register route
router.route('/cadastro/novo')
    /* Method Create */
    .post((req, res) => {
        var user = new User({
            name: req.body.user_name,
            ecivil: req.body.user_mstatus,
            age: req.body.user_age,
            cpf: req.body.user_cpf,
            city: req.body.user_city,
            uf: req.body.user_uf
        })
        user.save((err, user) => {
            if (err) res.send("Houve um erro: " + err);
            res.json({ message: 'Cadastro realizado com sucesso!' })
        })
    })

/* Delete user route */
router.route('/cadastro/remover')
    /* Method Delete */
    .delete((req, res) => {
        User.deleteOne({
            _id: req.params.user_id
        }, (err) => {
            if (err) res.send("Id não encontrado: " + err)
            res.json({ message: "Usuário excluido" })
        })
    })


/* Edit user route */
router.route("/cadastro/editar")
    /* Method Update */
    .post((req, res) => {
        User.findById({ _id: req.body.id }, (err, user) => {
            if (err) res.send("Houve um erro ao atualizar: " + err)

            user.name = req.body.user_name;
            user.ecivil = req.body.user_mstatus;
            user.age = req.body.user_age;
            user.cpf = req.body.user_cpf;
            user.city = req.body.user_city;
            user.uf = req.body.user_uf;

            user.save((err) => {
                if (err) res.send('Erro ao atualizar: ' + err)
                res.json({ message: "Produto atualizado" })
            })
        })
    });

/* Route for API */
router.route('/api')
    /* Method Read */
    .get((req, res) => {
        User.find((error, usuarios) => {
            if (error) res.send('Houve um erro: ' + error)
            res.json({ usuarios })
        })
    })

/* Render methods */
router.get('/', (req, res) => {
    User.find((error, usuarios) => {
        if (error) res.send('Houve um erro: ' + error)
        res.render('tabela', { usuarios })
    })
});

router.get('/cadastro', (req, res) => {
    res.render('admin/formulario')
});

router.get("/remover/:id", (req, res) => {
    res.send('rota remove')
})

router.get("/editar/:id", (req, res) => {
    User.findOne({ _id: req.params.id }).then((user) => {
        res.render('admin/editar', { user: user })
    }).catch((err) => {
        res.send("Houve um erro: " + err)
    })
})

module.exports = router