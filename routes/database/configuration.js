const { Pool, Client } = require('pg')
const dotenv = require('dotenv').config();
const connectString = process.env.DATABASE_URL;

console.log("connection string", connectString);
const client = new Client({
    connectString
})
async function createUser() {
    try {
        client.connect();
        var userTable = "create table [if not exists] users(id int primary key not null,name text not null, email char(50) not null, phone_number bigint not null, address char(100) not null)";
        client.query(userTable, function (err, result1) {
            if (err) {
                console.log("create table usererror",err);
            }
            else {
                console.log("create table user success",result1);
                var postsTable = "create table [if not exists] posts(id int primary key not null, text text not null, description text not null, user_id int not null,foreign key(user_id) references user(id)";
                client.query(postsTable, function (err, result) {
                    if (err) {
                        console.log("create table posts",err);
                    }
                    else {
                        console.log("create table posts success",result)
                    }
                })
            }
        })
    }
    catch (e) {
        console.log(e);
    }
}

createUser();


module.exports = { client };