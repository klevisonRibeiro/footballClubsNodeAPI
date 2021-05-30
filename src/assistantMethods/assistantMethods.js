module.exports = {

    fillClubsArray(clubs){
        let result = [];

        clubs.forEach(currentClub => {
            result.push({
                id: currentClub.clubId,
                name: currentClub.clubName,
                clubCountry: currentClub.clubCountry,
                internationalTrophies: validateTrophies(currentClub.internationalTrophies),
                continentalTrophies: validateTrophies(currentClub.continentalTrophies),
                nationalTrophies: validateTrophies(currentClub.nationalTrophies),
                regionalTrophies: validateTrophies(currentClub.regionalTrophies)
            })
        });

        return result;
    },

    validateInsertClubInput(body){
        let response = {
            "status": 200,
            "message": "OK"
        }

        if(!body.name){
            response.status = 400;
            response.message = "Field name is required!";
        }
        if(!body.creationYear){
            response.status = 400;
            response.message = "Field creationYear of the club is required!";
        }
        if(!body.clubCountry){
            response.status = 400;
            response.message = "Field clubCountry is required!";
        }

        return response;

    }
} 

function validateTrophies(trophies){
    if(trophies){
        return trophies;
    } 

    return 0;
}