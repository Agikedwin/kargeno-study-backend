
const { UserInputError } = require('apollo-server');


const PhysicalVisits = require('../../models/PhysicalVisits');
const physicalVisitServices = require('../../models/PhysicalVisitServices');
const visit = require('../../models/Visits');

const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');

const checkAuth = require('../../utils/check.auth');
var mongoose = require('mongoose');
const physicalVisit = require('../../models/PhysicalVisits');
const phoneCallVisits = require('../../models/PhoneCallVisits');
const {fistPhaseVisits, thirdVisitsPhase, fistPhasePhaneCalls, thirdPhasePhoneCall} = require('../../utils/visit-phases');




const fetchVisits = async () => {
    const visits = await  savedVisits.find().then(res => {
        fistPhaseVisits(res);
    });
    
    //return visits;
}


const firstVisitPopulate = async () => {
    try {
        
        const visitData = await visit.findOne();
            return visitData;

       
        
    } catch (error) {
        console.log(error)
    }

}

const saveFIrstVisitService = async (data) => {
  const newServiceProvided = new userServicesProvided(data);
   await newServiceProvided.save().then(res => {
   });
}
// fetch available visits
const getAllVisits = async (userId, third_visit_date) => {
    const physicalVisitsData = [];
    await  visit.find().then(data =>{
        if(data){
           
            
            // compose vist array
            for(let i = 2; i < data.length; i++){
                
                let { visit_date } =  thirdVisitsPhase(data[i].dayFromBaseDate, third_visit_date);
                physicalVisitsData.push({
                userId: userId,
                visitId: data[i]._id,
                visitStatus: 0,
                date_created: new Date(),
                date_updated: new Date(),
                visit_date: new Date(visit_date).toLocaleDateString('sv'),
                status: 0,
                });
                
            

            }

        }
    })

     await physicalVisit.insertMany(physicalVisitsData).then(res => {
        console.log('Physical visits successfully inserted')
        getAllPhoneCalls(userId);
     });
       
}

const getAllPhoneCalls = async (userId) => {
    const physicalVisitsData = [];
    const userIdObj = new mongoose.Types.ObjectId(userId);
    await  physicalVisit.find({userId: userIdObj}).then(data =>{
        if(data){       
             
            // compose vist arr uay
            for(let i = 2; i < data.length-1; i++){ // start counting from third visit
                

                let daysDiff = new Date(data[i+1].visit_date).getTime()  -  new Date(data[i].visit_date).getTime();
                let totalDays = Math.ceil(daysDiff / (1000 * 3600 * 24));

                // sub 7 , no visit within 7 days

                phoneCallDays = totalDays -7;
                
                            
               
                    if(phoneCallDays > 7){                       
                        
                        
                        for(let j = 0; j < phoneCallDays; j++){
                           if(j % 7 === 0 && i >3){
                             

                                // starts from third visit only
                                let { visit_date } =  thirdPhasePhoneCall(j, data[i].visit_date);
                                physicalVisitsData.push({
                                    userId: userId,
                                    visitId: data[i].visitId,
                                    physicalVisitId: data[i]._id,
                                    visitStatus: 0,
                                    date_created: new Date(),
                                    date_updated: new Date(),
                                    visit_date: new Date(visit_date).toLocaleDateString('sv'),
                                    status: 0,
                                });
                               // console.log(phoneCallDays, ' The total days ', totalDays)   

                               // console.log(daysCount ,': count and date ',visit_date)

                            }
                            
                           
                        }
                        

                    }

                
             

            }

        }
    })
   // console.log('The total days ', physicalVisitsData) 

    // Insert into visit calls table

     await phoneCallVisits.insertMany(physicalVisitsData).then(res => {
        console.log('Visit calls successfully inserted');
     });
       
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
                const serviceVisits = await physicalVisitServices.find({userId,visitId}).sort({_id: -1}).limit(1);
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
        

        async postPhysicalServices(_,arg,context,info){
            console.log('postPhysicalServices   ', arg);
            try {

                const {userId, visitId,visitType,visitDate,serviceOfferedId,physicalVisitId,visitNumber} = arg.data[0];

            userIdObj = new mongoose.Types.ObjectId(userId);
            visitIdObj = new mongoose.Types.ObjectId(visitId);
            serviceOfferedIdObj = new mongoose.Types.ObjectId(serviceOfferedId);

            
            const recordExits = await physicalVisitServices.findOne({userId,visitId,serviceOfferedId,visitDate});
            console.log('Visit 3 being saved --------------------------------',recordExits);

            
            if(!recordExits){
                console.log(visitNumber, '  Visit 3 being saved --------------------------------');
                const newServicesProvided = new physicalVisitServices({
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

                    // if third visit, populate sunsequent visits

                    if(visitNumber == 3 ){
                        await getAllVisits(userIdObj,visitDate)

                    }else{
                        console.log('Visit 3 being saved not 3--------------------------------',visitNumber);

                    }

                    

                     await PhysicalVisits.findOneAndUpdate({_id: physicalVisitId},{visitStatus : true,status:1},
                        {
                            returnOriginal: false
                          }); 
                    
    
                return {
                    ...res._doc,
                    id: res._id,
                    message: 'Save successfully'
                }

            }else {
                return {
                    status: '600',
                    message:  ` ${serviceOfferedId} already exists for user ${serviceOfferedId}`
                }
               // throw new UserInputError(` ${userId} already exists for user ${visitId}  `);
            }

                
            } catch (error) {
                console.log(error);
                
            }
           
  

            


        }

    }
}