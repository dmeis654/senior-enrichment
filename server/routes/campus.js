var express = require('express');
var router = express.Router();
var Promise = require('bluebird')

var Campus = require('../../db/models/campus');

router.get('/', (req, res, next) => {
    Campus.findAll({})
        .then(campuses => {
            res.json(campuses)
        })
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    Campus.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(campuses => {
            res.json(campuses)
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    Campus.create(req.body)
        .then(campus => res.json(campus))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Campus.findById(req.params.id)
        .then((campus) => {
            return campus.update({
                name: req.body.name,
                img: req.body.img
            })
        })
        .then(updatedCampus => res.json(updatedCampus))
        .catch(next)
})

router.delete('/:id', function (req, res, next) {
    Campus.findById(req.params.id)
        .then((campus) => {
            return campus.destroy()
        })
        .then(() => res.json("Campus Deleted"))
        .catch(next)
});

module.exports = router

// GET
// - all campuses
// - a campus by id
// - all students
// - a student by id
// POST
// - new campus
// - new student
// PUT
// - updated student info for one student
// - updated campus info for one campus
// DELETE
// - a campus
// - a student