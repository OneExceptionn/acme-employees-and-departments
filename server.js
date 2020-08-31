const express = require('express')
const app = express() 
const morgan = require('morgan')
const path = require('path')
const { Employees } = require('./db')
const db = require('./db')

app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/employees', async (req, res, next) => {
    try {
        const employees = await Employees.findAll()
        res.send(employees)
    } catch (err) {
        console.log(err)
    }
})

app.put('/api/employees/:id', async(req, res, next)=> {
    try {
        const employee = await Employees.findByPk(req.params.id);
        employee.update({
            department: 0
        })
        res.sendStatus(204)
    } catch(ex){
        next(ex);
    }
});

app.delete('/api/employees/:id', async(req, res, next)=> {
    try {
      const employee = await Employees.findByPk(req.params.id);
      await employee.destroy();
      res.sendStatus(204)
    } catch(ex){
        next(ex);
    }
});



PORT = 3000

const init = async () => {
    try {
        await db.syncAndSeed();
        app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

init();
