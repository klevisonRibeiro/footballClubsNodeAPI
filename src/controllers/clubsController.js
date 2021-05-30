const clubsService = require('../services/clubsService');
const assistantMethods = require('../assistantMethods/assistantMethods');

module.exports = {
    allClubs: async (req, res) => {
        let response = {
            error: '',
            result: []
        };

        let clubs = await clubsService.allClubs();
        response.result = assistantMethods.fillClubsArray(clubs);
        
        res.json(response);

    },

    getClubById: async (req, res) => {
        let response = {
            error: '',
            result: []
        };

        let id = req.params.id;
        let club;

        club = await clubsService.getClubById(id);

        if(club){
            response.result = assistantMethods.fillClubsArray(club);
            res.json(response);
        } else {                
            res.status(404).send({ error: "Not found any club with this id" });
        }

    },

    deleteClubById: async (req, res) => {
        let response = {
            error: '',
            result: []
        };

        let id = req.params.id;
        let club;

        club = await clubsService.deleteClubById(id);

        if(club){
            response.result = "Club with id = " + id + " deleted! >> " + JSON.stringify(club);
            res.json(response);
        } else {                
            res.status(404).send({ error: "Not found any club with this id" });
        }

    },

    // tentar inserir via raw postman
    insertClub: async (req, res) => {
        let response = {
            error: '',
            result: []
        };
        
        let name, creationYear, clubCountry, insertResult;
        let validationResponse = assistantMethods.validateInsertClubInput(req.body);
        console.log(req.body);

        if(validationResponse.status != 200){
            res.status(validationResponse.status).send({ error: validationResponse.message });
        } else {
            name = req.body.name;
            creationYear = req.body.creationYear;
            clubCountry = req.body.clubCountry;

            insertResult = await clubsService.insertClub(name, creationYear, clubCountry);
            response.result = {
                name: name,
                creationYear: creationYear,
                clubCountry: clubCountry,
                status: "Club inserted!"
            }

            res.json(response);

        }
    },

}