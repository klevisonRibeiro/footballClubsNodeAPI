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

        club = await clubsService.getClubById(id);
        await clubsService.deleteClubById(id);

        if(club){
            response.result = "Club  " + club[0].clubName + " deleted!";
            res.json(response);
        } else {                
            res.status(404).send({ error: "Not found any club with this id" });
        }

    },

    insertClub: async (req, res) => {
        let response = {
            error: '',
            result: []
        };
        
        let club, insertResult;
        let validationResponse = assistantMethods.validateInsertClubInput(req.body);
        // console.log(req.body);

        if(validationResponse.status != 200){
            res.status(validationResponse.status).send({ error: validationResponse.message });
        } else {
            club = req.body;
            insertResult = await clubsService.insertClub(club);
            response.result = {                
                message: "Club " + club.name + " inserted!"
            }
            res.json(response);
        }
    },

    updateClub: async (req, res) => {
        let response = {
            error: '',
            result: []
        };
        
        let updateResult, validationResponse;
        let club = req.body; 
        // console.log(req.body);

        if(club.id){
            validationResponse = assistantMethods.validateInsertClubInput(club);    

            if(validationResponse.status != 200){
                res.status(validationResponse.status).send({ error: validationResponse.message });
            } else {
                updateResult = await clubsService.updateClub(club);
                response.result = {
                    message: "Club " + club.name + " updated!"
                }
                res.json(response);
            }
        } else {
            res.status(400).send({ error: "Field id is required!" });
        }
    }

}