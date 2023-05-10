
const { UserInputError } = require('apollo-server');


const Visits = require('../../models/Visits');

const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');

const checkAuth = require('../../utils/check.auth');
var mongoose = require('mongoose');
const ServicesProvided = require('../../models/PhysicalVisitServices');



module.exports = {
    Query: {
        async getVisits(){
          try {
                const userVisits = await Visits.find();
                return userVisits;
                
            } catch (error) {
                throw new Error(error);
            } 

           

        },

    },

    Mutation: {
 

        async postVisits(_,arg,context,info){
            console.log('Error getting all postVisits', arg.data);
  

            const {visitName, visitNumber,windowPeriod,description,dayFromBaseDate,program_id} = arg.data;

            programObjId = new mongoose.Types.ObjectId(program_id)

            const recordExits = await Visits.findOne({visitName});
     
            
            if(!recordExits){
                const findVisitNumber = await Visits.findOne();
                let visitNo = 0;
                if(findVisitNumber){
                    visitNo = findVisitNumber.visitNumber +1;
                }else {
                    visitNo = 1;
                }
                console.log('findVisitNumber  ::: ', visitNo);
                //const visitNumber = findVisitNumber.visitNumber;
                const newVisit = new Visits({
                    visitName: visitName,
                    visitNumber: visitNo,
                    windowPeriod: windowPeriod,
                    dayFromBaseDate: dayFromBaseDate,
                    description: description,
                    program_id: programObjId,
                    status: 1,
                    date_updated: new Date(),
                    date_created: new Date(),
                });
    
                const res = await newVisit.save();
    
                return {
                    ...res._doc,
                    id: res._id,
                    message: 'Save successfully'
                }

            }else {
                throw new UserInputError(` ${visitName} already exists  `);
            }

            


        }

    }
}