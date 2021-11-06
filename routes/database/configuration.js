const { Pool, Client } = require('pg')
require("dotenv").config();
// const connectString = process.env.DATABASE_URL;

const isProd = process.env.DB_RUNNING === "prod" ? true : false;

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const client = new Pool({
    connectionString: isProd ? process.env.DATABASE_URL : connectionString,
    ssl: isProd ? { rejectUnauthorized: false } : false
});

client.connect();

function createUser() {
    try {
        var userTable = "create table if not exists users (id int primary key not null,name text not null, email char(50) not null, phone_number bigint not null, address char(100) not null)";
        client.query(userTable, function (err, result1) {
            if (err) {
                console.log("create table usererror",err);
            }
            else {
                console.log("create table user success",result1);
                var postsTable = "create table if not exists posts (id int primary key not null, text text not null, description text not null, user_id int not null, foreign key (user_id) references users(id))";
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