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

    insertClub: (club) => {
        return new Promise((accepted, denied) => {
            db.query('INSERT INTO clubs (clubName, creationYear, clubCountry, internationalTrophies,' +
             ' continentalTrophies, nationalTrophies, regionalTrophies)' +
             ' VALUES (?, ?, ?, ?, ?, ?, ?)', 
                [
                    club.name, club.creationYear, club.clubCountry, club.internationalTrophies, 
                    club.continentalTrophies, club.nationalTrophies, club.regionalTrophies
                ], 
                (error, results) => {
                    if(error) {
                        denied(error); 
                        return;
                    } 
                    accepted(results.insertId);
                }
            );
        });
    },

    updateClub: (club) => {
        return new Promise((accepted, denied) => {
            db.query('UPDATE clubs ' +
                'SET clubName = ?, creationYear = ?, clubCountry = ?, ' +
                'internationalTrophies = ?, continentalTrophies = ?, nationalTrophies = ?,' +
                'regionalTrophies = ? WHERE clubId = ?', 
                [
                    club.name, club.creationYear, club.clubCountry, 
                    club.internationalTrophies, club.continentalTrophies, club.nationalTrophies,
                    club.regionalTrophies, club.id
                ], 
                (error, results) => {
                    if(error) {
                        denied(error); 
                        return;
                    } 
                    accepted(results);
                }
            );
        });
    }


};