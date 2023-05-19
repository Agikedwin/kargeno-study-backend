
const { UserInputError } = require('apollo-server');


const PhoneCallServices = require('../../models/PhoneCallServices');
const PhoneCallVisits = require('../../models/PhoneCallVisits');
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
        async getPhoneServices(){
            try {
                const services = await PhoneCallServices.aggregate([
                    {
                        $group : {_id:"$status",count:{$sum:1}}
                    }
                ]).then(res => {
                    console.log(res);
                    return res;

                });
               
                //fetchVisits();
                
            } catch (error) {
                throw new Error(error);
            }
        },
        async getLastServiceProvided(_,args,context){
           
           

            const {visitId,userId} = args.paramId
            

            try {
                const serviceVisits = await PhoneCallServices.find({userId,visitId}).sort({_id: -1}).limit(1);
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
        

        async postPhoneServices(_,arg,context,info){
            console.log(':::::postPhoneServices---- ',arg);

            
            try {

                const {userId, visitId,visitType,visitDate,serviceOfferedId,callVisitId} = arg.data[0];

            userIdObj = new mongoose.Types.ObjectId(userId);
            visitIdObj = new mongoose.Types.ObjectId(visitId);
            serviceOfferedIdObj = new mongoose.Types.ObjectId(serviceOfferedId,serviceOfferedId,visitType);

            
            const recordExits = await PhoneCallServices.findOne({userId,visitId,serviceOfferedId,visitDate});

            
            if(!recordExits){
                const newServicesProvided = new PhoneCallServices({
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

                    await PhoneCallVisits.findOneAndUpdate({_id: callVisitId},{visitStatus : true,status:1},
                        {
                            returnOriginal: false
                          });
                    
    
                return {
                    ...res._doc,
                    id: res._id,
                    message: 'Save successfully'
                }

            }else {
                console.log('already exits');
                return {
                    status: '600',
                    message:  ` ${serviceOfferedId} already exists for user ${serviceOfferedId}  `
                }
               // throw new UserInputError(` ${serviceOfferedId} already exists for user ${serviceOfferedId}  `);
            }

                
            } catch (error) {
                console.log(error);
                
            }
           
  

            


        }

    }
}