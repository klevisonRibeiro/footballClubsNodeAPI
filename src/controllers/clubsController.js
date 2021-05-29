const clubsService = require('../services/clubsService');

module.exports = {
    allClubs: async (req, res) => {
        let response = {
            error: '',
            result: []
        };

        let clubs = await clubsService.allClubs();

        clubs.forEach(currentClub => {
            response.result.push({
                id: currentClub.clubId,
                name: currentClub.clubName,
                clubCountry: currentClub.clubCountry,
                internationalTrophies: validateTrophies(currentClub.internationalTrophies),
                continentalTrophies: validateTrophies(currentClub.continentalTrophies),
                nationalTrophies: validateTrophies(currentClub.nationalTrophies),
                regionalTrophies: validateTrophies(currentClub.regionalTrophies)
            })
        });

        res.json(response);

    }
}

function validateTrophies(trophies){
    if(trophies){
        return trophies;
    } 

    return 0;
}