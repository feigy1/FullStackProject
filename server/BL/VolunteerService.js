const VolunteerRepository = require("../DAL/Repository/VolunteerRep");
const BaseService = require("./BaseService");
const dataError = require("./Errors/dataError");
const idError = require("./Errors/idError");
const validVolunteer = require("./validations/VolunteerValidator");
class VolunteerService extends BaseService {
    constructor() {
        super(VolunteerRepository);
    }
    async insert(item) {
        console.log("🔍 קלט שהתקבל:", item);
        item.id = Number(item.id);
        let valid = validVolunteer(item);
        if (valid.error) {
            console.log("❌ לא הצליח: ", valid.error.details); 
            throw new idError("error");
        } else {
            console.log("✅ הצליח");
            console.log("item.id:"+item.id);
            let volunteer = await this.repository.getById(item.id);
            console.log("🔍 Volunteer שהתקבל:", volunteer);
            console.log(volunteer);
            if (volunteer == null) {
                console.log("✅ נכנס");
                return await this.repository.insert(item);
            }
            else {
                console.log("אתה רשום כבר !!! תעשה משהו!!!");
                alert("אתה רשום כבר !!! תעשה משהו!!!")
                throw new idError("this id is already exist");
            }
        }
    }

}
let volunteerService = new VolunteerService();
module.exports = volunteerService;