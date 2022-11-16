const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', async (req, res, next) => {
    try {
        res.render('celebrities/new-celebrity');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.post('/celebrities/create', async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase } = req.body;
        const newActress = await Celebrity.create({
            name,
            occupation,
            catchPhrase,
        });
        console.log('new actress created', newActress);
        res.redirect('/celebrities');
    } catch (err) {
        console.log(err);
        res.redirect('/celebrities/create');
    }
});

router.get('/celebrities', async (req, res) => {
    try {
        const celebrities = await Celebrity.find({});
        res.render('celebrities/celebrities', { celebrities });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
