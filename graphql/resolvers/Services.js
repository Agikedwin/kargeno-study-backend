
const { UserInputError } = require('apollo-server');


const VisitServices = require('../../models/VisitServices');

const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');

const checkAuth = require('../../utils/check.auth');
var mongoose = require('mongoose');

module.exports = {
    Query: {
        async getVisitServices(){
            try {
                const services = await VisitServices.find();
                return services;
                
            } catch (error) {
                throw new Error(error);
            }
        },

        /* async getProgramById(id){
            try {
                const program = await Program.findById({id});
                return program;
                
            } catch (error) {
                throw new Error(error);
            }
        } */
    },

    Mutation: {
        

        async postVisitServices(_,arg,context,info){
  

            const {visitId, serviceName,duration,description,status} = arg.data;

            visitObjId = new mongoose.Types.ObjectId(visitId)

            const recordExits = await VisitServices.findOne({visitId,serviceName});
            
            
            if(!recordExits){
                const newVisitServices = new VisitServices({
                    visitId: visitObjId,
                    serviceName: serviceName,
                    duration: duration,
                    description: description,
                    status: status,
                    date_created: new Date(),
                    date_updated: new Date(),
                });
    
                const res = await newVisitServices.save();
    
                return {
                    ...res._doc,
                    id: res._id,
                    message: 'Save successfully'
                }

            }else {
                throw new UserInputError(` ${serviceName} already exists for visit ${visitId}  `);
            }

            


        }

    }
}