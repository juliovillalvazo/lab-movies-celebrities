const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/movies', async (req, res) => {
    try {
        const allMovies = await Movie.find({}).populate('cast');
        res.render('movies/movies', { allMovies });
    } catch (err) {
        console.log(err);
    }
});

router.get('/movies/create', async (req, res) => {
    try {
        const allCelebrities = await Celebrity.find({});
        console.log(allCelebrities);
        res.render('movies/new-movie', { allCelebrities });
    } catch (err) {
        console.log(err);
    }
});

router.post('/movies/create', async (req, res) => {
    try {
        const { title, genre, plot, cast } = req.body;
        const savedEntry = await Movie.create({ title, genre, plot, cast });

        console.log('saved entry: ', savedEntry);

        res.redirect('/movies');
    } catch (err) {
        res.redirect('/movies/create');
        console.log(err);
    }
});

router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('cast');

        res.render('movies/movie-details', movie);
    } catch (err) {
        console.log(err);
    }
});

router.post('/movies/:id/delete', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEntry = await Movie.findByIdAndRemove(id);

        res.redirect('/movies');
    } catch (err) {
        console.log(err);
    }
});

router.get('/movies/:id/edit', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    const allCelebrities = await Celebrity.find({});

    console.log({ movie, allCelebrities });

    res.render('movies/edit-movie', { movie, allCelebrities });
});

router.post('/movies/:id/edit', async (req, res) => {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body);

    console.log('successfully updated');
    res.redirect(`/movies/${id}`);
});

module.exports = router;
