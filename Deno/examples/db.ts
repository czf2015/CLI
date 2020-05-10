import { Client } from "https://deno.land/x/mysql/mod.ts";


const client = await new Client().connect({
    hostname: "127.0.0.1",
    username: "root",
    db: "test",
    poolSize: 3, // connection limit
    password: "mysql",
});

async function init () {
    // create database
    await client.execute(`CREATE DATABASE IF NOT EXISTS test`);
    await client.execute(`USE test`);

    // create tables
    await client.execute(`DROP TABLE IF EXISTS users`);
    await client.execute(`
        CREATE TABLE users (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            created_at timestamp not null default current_timestamp,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
};


// ### insert
async function insert () {
    let result = await client.execute(`INSERT INTO users(name) values(?)`, [
        "manyuanrong",
    ]);
    console.log(result);
}
// { affectedRows: 1, lastInsertId: 1 }


// ### update
async function update () {
    let result = await client.execute(`update users set ?? = ?`, ["name", "MYR"]);
    console.log(result);
    // { affectedRows: 1, lastInsertId: 0 }
}


// ### delete
async function del () {
    let result = await client.execute(`delete from users where ?? = ?`, ["id", 1]);
    console.log(result);
    // { affectedRows: 1, lastInsertId: 0 }
}


// ### query
async function query () {
    const username = "manyuanrong";
    const users = await client.query(`select * from users`);
    const queryWithParams = await client.query(
        "select ??,name from ?? where id = ?",
        ["id", "users", 1]
    );
    console.log(users, queryWithParams);
}

// ### transaction
// (async () => {
//     const users = await client.transaction(async (conn) => {
//         await conn.excute(`insert into users(name) values(?)`, ["test"]);
//         return await conn.query(`select ?? from ??`, ["name", "users"]);
//     });
//     console.log(users.length);
// })();

// ### close
// await client.close();

init().then(insert).then(update).then(del).then(query)