
const { UserInputError } = require('apollo-server');


const ServicesProvided = require('../../models/PhysicalVisitServices');
const savedVisits = require('../../models/Visits');

const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');

const checkAuth = require('../../utils/check.auth');
var mongoose = require('mongoose');
const {fistPhaseVisits} = require('../../utils/visit-phases');

const fetchVisits = async () => {
    const visits = await  savedVisits.find().then(res => {
        fistPhaseVisits(res);
    });
    
    //return visits;
}


module.exports = {
    Query: {
        async getPhysicalServices(){
            try {
                //const services = await ServicesProvided.find();
                //return services;
                fetchVisits();
                
            } catch (error) {
                throw new Error(error);
            }
        },
        async getLastServiceProvided(_,args,context){
           
           

            const {visitId,userId} = args.paramId
            

            try {
                const serviceVisits = await ServicesProvided.find({userId,visitId}).sort({_id: -1}).limit(1);
                console.log(' ---------- ::: ',serviceVisits)
                return serviceVisits;
                
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
        

        /* async postPhysicalServices_old(_,arg,context,info){

            
            try {

                const {userId, visitId,visitType,visitDate,serviceOfferedId} = arg.data[0];

            userIdObj = new mongoose.Types.ObjectId(userId);
            visitIdObj = new mongoose.Types.ObjectId(visitId);
            serviceOfferedIdObj = new mongoose.Types.ObjectId(serviceOfferedId);

            
            const recordExits = await ServicesProvided.findOne({userId,visitId,visitType,visitDate,serviceOfferedId});

            
            if(!recordExits){
                const newServicesProvided = new ServicesProvided({
                    userId: userIdObj,
                    visitId:  visitIdObj,
                    visitType: visitType,
                    visitDate: visitDate, 
                    serviceOfferedId: serviceOfferedIdObj,
                    date_created: new Date(),
                    date_updated: new Date(),
                    status: 1
                });

               
                    const res = await newServicesProvided.save();
                    console.log(':::::Agik---- ',res);
                    
                
                
                
    
                return {
                    ...res._doc,
                    id: res._id,
                    message: 'Save successfully'
                }

            }else {
                throw new UserInputError(` ${serviceOfferedId} already exists for user ${serviceOfferedId}  `);
            }

                
            } catch (error) {
                console.log(error);
                
            }
           
  

            


        }
 */
    }
}