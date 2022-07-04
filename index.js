const logger = require('./logger');
const EventEmitter = require('events');

const express = require('express');
const app = express();
app.use(express.json());

let employees = [{id:1,name:'Mo'},{id:2,name:'Abjal'},{id:3,name:'Sameer'}];


app.get('/',(req,resp)=>{
    resp.send('Root')
})

app.get('/employees',(req,resp)=>{
    resp.send(JSON.stringify(employees));
})

app.get('/employees/:id',(req,resp)=>{
    console.log(req.params.id);
    const emp = employees.find(emp=>emp.id==req.params.id);
    resp.send(emp);
})

app.post('/employees',(req,resp)=>{
    const emp = req.body;
    console.log(emp);
    if(!emp){
        resp.status(403).send('Invalid request');
        return;
    }   

    employees.push(emp);
    resp.status(201).send('Inserted record');
})

app.put('/employees/:id',(req,resp)=>{
    const id = req.params.id;
    const emp = req.body;
    const e = employees.find(e=>e.id==id);
    if(!e){
        resp.status(404).send('Not found'); return;
    }
    e.name = emp.name;
    resp.send('Updated');
});

app.delete('/employees/:id',(req,resp)=>{
    const id = req.params.id;
    if(!id){
        resp.status(400).send('Invalid request'); return;
    }
    const idx = employees.findIndex(e=>e.id==id);
    if(idx<0){
         resp.status(404).send('Not found'); return;
    }
    employees.splice(idx,1);
    resp.send('Deleted');
})

app.listen(3001,()=>{
    console.log('Listning on port 3001');
});

logger(__filename);