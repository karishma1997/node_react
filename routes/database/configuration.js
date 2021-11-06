const {Pool, Client}=require('pg')
const dotenv = require('dotenv').config();

const client = new Client({
    user : process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password:process.env.PASSWORD,
    port: process.env.PORT,
})
client.connect()

async function createUser(){
    var userTable = "create table [if not exists] users(id int primary key not null,name text not null, email char(50) not null, phone_number bigint not null, address char(100) not null)" ;
    client.query(userTable, function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            var postsTable ="create table [if not exists] posts(id int primary key not null, text text not null, description text not null, user_id int not null,foreign key(user_id) references user(id)";
            client.query(postsTable, function(err,result){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log(result);
                }
            })
        }
    })
}


 
module.exports ={client};