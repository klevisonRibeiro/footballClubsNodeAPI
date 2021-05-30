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
    },

    getClubById: (id) => {
        return new Promise((accepted, denied) => {
            db.query('SELECT * FROM clubs WHERE clubId = ?', [id], (error, results) => {
                if(error) {
                    denied(error); 
                    return;
                } 

                if(results.length > 0){
                    accepted(results);
                } else {
                    accepted(false);
                }
            });
        });
    },

    deleteClubById: (id) => {
        return new Promise((accepted, denied) => {
            db.query('DELETE FROM clubs WHERE clubId = ?', [id], (error, results) => {
                if(error) {
                    denied(error); 
                    return;
                } 

                if(results){
                    accepted(results);
                } else {
                    accepted(false);
                }
            });
        });
    },

    insertClub: (name, creationYear, clubCountry) => {
        return new Promise((accepted, denied) => {
            db.query('INSERT INTO clubs (clubName, creationYear, clubCountry) VALUES (?, ?, ?)', 
                [name, creationYear, clubCountry], 
                (error, results) => {
                    if(error) {
                        denied(error); 
                        return;
                    } 
                    accepted(results.insertId);
                }
            );
        });
    }
};