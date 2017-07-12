var express = require('express');
var router = express.Router();
var Promise = require('bluebird')

var Student = require('../../db/models/student');

router.get('/', (req, res, next) => {
    Student.findAll({})
        .then(students => {
            res.json(students)
        })
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    Student.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(student => {
            res.json(student)
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    Student.create(req.body)
        .then(student => res.json(student))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then((student) => {
            return student.update({
                name: req.body.name,
                img: req.body.img
            })
        })
        .then(updatedStudent => res.json(updatedStudent))
        .catch(next)
})

router.delete('/:id', function (req, res, next) {
    Student.findById(req.params.id)
        .then((student) => {
            return student.destroy()
        })
        .then(() => res.json("Student Deleted"))
        .catch(next)
});

module.exports = router