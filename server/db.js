const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

db.serialize(() => {
    db.run('CREATE TABLE objects (info TEXT)');
    const stmt = db.prepare('INSERT INTO objects VALUES (?)');

    for(let i = 0; i < 10; i++){
        stmt.run('Count ${i}');
    }


    stmt.finalize(); 


    db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
        console.log(`${row.id}: ${row.info}`)
      })
})  


db.close