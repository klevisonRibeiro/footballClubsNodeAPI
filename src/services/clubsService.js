const { response } = require('express');
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
    },

    getLeague: (leagueId) => {
        
        // request way-1 (working)
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

        let resourceUrl = "https://v3.football.api-sports.io/leagues?id=" + leagueId;
        
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", resourceUrl, false);
    
        xhttp.setRequestHeader("x-rapidapi-host", "v3.football.api-sports.io");
        xhttp.setRequestHeader("x-rapidapi-key", "3cab8249610ac29c980a4351b6531dbe");
    
        xhttp.send();
        
        let result = JSON.parse(xhttp.responseText);
        return result;

        // request way-2 (not working)
        // var request = require("request");
        // var options = {
        // method: 'GET',
        // url: 'https://v3.football.api-sports.io/leagues?id=' + leagueId,
        // headers: {
        //     'x-rapidapi-host': 'v3.football.api-sports.io',
        //     'x-rapidapi-key': '3cab8249610ac29c980a4351b6531dbe'
        // }
        // };

        // request(options, function (error, response, body) {
        //     if (error) throw new Error(error);

        //     //console.log(body);
        //     return body;
        // });

        
    }

};