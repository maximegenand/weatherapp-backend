const express = require("express");
const router = express.Router();
const User = require('../models/users');

const { checkBody } = require('../modules/checkBody');


// On enregistre un nouveau user
router.post("/signup", (req, res) => {
    // Si le post a un paramètre email et password et qu'ils ne sont pas vide
    if(checkBody(req.body, ['email', 'password'])) {
        const email = req.body.email.trim();
        const password = req.body.password;
        // On vérifie si le user est dans la bdd
        User.findOne({ email })
        .then(data => {
            // Si le user existe déjà
            if (data) res.json({ result: false, error: 'User already exists' });
            // Si le user n'existe pas on peut l'enregistrer
            else {
                // On check si le name est renseigné, et s'il ne l'est pas notre user est Anonymous
                let name;
                if (checkBody(req.body, ['name'])) name = req.body.name.trim();
                else name = 'Anonymous';
                const saveUser = new User({
                    name,
                    email,
                    password,
                });
                saveUser.save()
                .then(() => res.json({ result: true }))
                .catch(() => res.json({ result: false, error: "City can't be saved" }));
            }
        })
        .catch(error => res.json({ result: false, error }));
    }
    // Si une des valeurs est vide
    else res.json({ result:   false, error: 'Missing or empty fields' });
});


// On récupère les identifiants d'un user pour le connecter
router.post("/signin", (req, res) => {
    // Si le post a un paramètre email et password et qu'ils ne sont pas vide
    if(checkBody(req.body, ['email', 'password'])) {
        const email = req.body.email.trim();
        const password = req.body.password;
        // On vérifie si le user est dans la bdd
        User.findOne({ email, password })
        .then(data => {
            // Si le user existe
            if (data) res.json({ result: true });
            // Si le user n'existe pas
            else res.json({ result: false, error: 'User not found' });
        })
        .catch(error => res.json({ result: false, error }));
    }
    // Si une des valeurs est vide
    else res.json({ result:   false, error: 'Missing or empty fields' });
});


module.exports = router;
