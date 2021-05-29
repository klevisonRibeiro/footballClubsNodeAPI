const db = require('../db');

module.exports = {
    allClubs: () => {
        return new Promise((accepted, denied) => {
            db.query('SELECT * FROM clubs', (error, results) => {
                if(error) {
                    denied(error); 
                    return;
                }            
                accepted(results);
            });
        });
    }
};