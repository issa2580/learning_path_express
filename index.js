const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {
        id: 1,
        title: 'programming',
    },
    {
        id: 2,
        title: 'gamming',
    },
    {
        id: 3,
        title: 'design',
    }
]

app.get('/', (req, res) => {
    res.send('hello world !')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(courseId => courseId.id === parseInt(req.params.id))
    if(!course) res.status(404).send(`course with id ${req.params.id} is not available`)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(courseId => courseId.id === parseInt(req.params.id))
    if(!course) res.status(404).send(`course with id ${req.params.id} is not available`)
    course.title = req.body.title
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(courseId => courseId.id === parseInt(req.params.id))
    if(!course) res.status(404).send(`course with id ${req.params.id} is not available`)
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const schema = {
        title: Joi.string().min(3).required()
    }
    const results = Joi.object(req.body, schema)
    if(results.error){
        res.status(400).send(results.message)
        return
    }
    const newCourse = {
        id: courses.length + 1,
        title: req.body.title
    }
    courses.push(newCourse)
    res.send(newCourse)
})

app.post('/api/courses', (req, res) => {
    const schema = {
        title: Joi.string().min(3).required()
    }
    const results = Joi.object(req.body, schema)
    if(results.error){
        res.status(400).send(results.message)
        return
    }
    const newCourse = {
        id: courses.length + 1,
        title: req.body.title
    }
    const course = courses.find(course => course.title === req.body.title) 
    if (course) res.status(400).send(`Course with title ${req.body.title} is existing`)
    else{
        courses.push(newCourse)
        res.send(newCourse)
    }
})

app.get('/api/posts/:years/:month', (req, res) => {
    res.send(req.params)
})

const port = 5000
app.listen(port, () => {
    console.log("Server is running on port " + port)
})