const express = require('express');
const axios = require('axios').default;
const mysql = require('mysql');

const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

main();

function main() {
    app.get('/', (req, res)=>{
        console.log('Criando nova pessoal');
        insert(res)
    })
    
    app.listen(port, ()=>{
        console.log('Rodando na porta: ' + port);
    })
}

async function insert(res){
    const connection = mysql.createConnection(config);
    const name = "savio";
    const sql = `INSERT INTO people(name) values('${name}')`;
    connection.query(sql);
    getPeople(res, connection);
}

function getPeople(res, connection) {    
    const sql = `SELECT id, name FROM people`;  
    
    connection.query(sql, (error, results, fields) => {
      if (error) {
        throw error
      };
      
      let table = '<table>';
      table += '<tr><th>#</th><th>Name</th></tr>';
      for(let people of results) {      
        table += `<tr><td>${people.id}</td><td>${people.name}</td></tr>`;
      }
  
      table += '</table>';    
      res.send('<h1>Full Cycle Rocks!</h1>' + table);    
    });   
    connection.end();
}