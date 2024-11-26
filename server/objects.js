const db = require('./db');

// GET ALL
function getObjects(){
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM skipObjects',(err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

// GET OBJECT
function getObjectById(id){
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM skipObjects where id=(?)', id, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        })
    })
}

// POST OBJECT
function addObject(name, comment, latitude, longitude, imagePath) {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO skipObjects (name, comment, latitude, longitude, imagePath) VALUES (?, ?, ?, ?, ?)',
            [name, comment, latitude, longitude, imagePath],
            (err) => {
                if (err) reject(err);
                else resolve();
            }
        );
    });
}


// PUT OBJECT
function editObject(id, name, comment){
    return new Promise((resolve, reject) => {
        db.run('UPDATE skipObjects SET name = (?), comment = (?) where id = (?)', [name, comment, id], err =>{
            if(err)
                reject(err);
            else    
                resolve();
        });
    });
}

// DELETE OBJECT
function deleteObject(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM skipObjects WHERE id = (?)', id, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}


module.exports = {
    getObjectById,
    getObjects,
    addObject,
    editObject,
    deleteObject
};