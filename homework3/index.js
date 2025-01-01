const express =require('express');
const fs=require('fs');
const path=require('path');

const app=express();

const pathToFile=path.join(__dirname,'data.json');

app.get('/', (req,res)=>{
    const data=JSON.parse(fs.readFileSync(pathToFile,'utf-8'));
    data.countHome+=1;
    fs.writeFileSync(pathToFile,JSON.stringify(data,null,2));
    res.send('<h1> Hello</h1> <a href="/about">To about</a> <p> Просмотров: '+data.countHome+'</p>');
})

app.get('/about', (req,res)=>{
    const data=JSON.parse(fs.readFileSync(pathToFile,'utf-8'));
    data.countAbout+=1;
    fs.writeFileSync(pathToFile,JSON.stringify(data,null,2));
    res.send('<h1> About Me</h1> <a href="/">To home</a> <p> Просмотров: '+data.countAbout+'</p>')
})


app.listen(3000);