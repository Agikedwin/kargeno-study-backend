
const { UserInputError } = require('apollo-server');


const userProgram = require('../../models/UserProgramEnrollement');

const userServicesProvided = require('../../models/PhysicalVisitServices');
const physicalVisit = require('../../models/PhysicalVisits');
const phoneCallVisits = require('../../models/PhoneCallVisits');


const visit = require('../../models/Visits');
const User = require('../../models/User');

const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');

const checkAuth = require('../../utils/check.auth');
const {fistPhaseVisits, thirdVisitsPhase, fistPhasePhaneCalls, thirdPhasePhoneCall} = require('../../utils/visit-phases');
var mongoose = require('mongoose');
const { model, Schema}  = require('mongoose');



const visitsModel = {
    userId: Schema.ObjectId,
    visitId: Schema.ObjectId,
    date_created:   Date,
   date_updated:  String,
    visitStatus: Boolean,
    visit_date: String,
    status: Number,
    
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
const getAllVisits = async (userId, enrollment_date) => {
    const physicalVisitsData = [];
    await  visit.find().then(data =>{
        if(data){
           
            
            let physicalVisitDate =  data[0].date_created;
            // compose vist array
            for(let i = 0; i < data.length; i++){
                if( i < 3){
                let { visit_date } =  fistPhaseVisits(data[i].dayFromBaseDate, enrollment_date);


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

        }
    })


     await physicalVisit.insertMany(physicalVisitsData).then(res => {
        console.log('Physical visits successfully inserted')
        getAllPhoneCalls(userId);
     });

     // update user status to 1 after enrollment
     await User.findOneAndUpdate({_id: userId},{status:1},
        {
            returnOriginal: false
          });
       
}

const getAllPhoneCalls = async (userId) => {
    const physicalVisitsData = [];
    const userIdObj = new mongoose.Types.ObjectId(userId);
    // get user specific visits
    await  physicalVisit.find({userId: userIdObj}).then(data =>{
        if(data){       
            
            
            // compose vist array
            for(let i = 0; i < data.length-1; i++){
                if(i == 3){
                   // break;
                }

                let daysDiff = new Date(data[i+1].visit_date).getTime()  -  new Date(data[i].visit_date).getTime();
                let totalDays = Math.ceil(daysDiff / (1000 * 3600 * 24));

                // sub 7 , no visit within 7 days

                phoneCallDays = totalDays -7;
                
                            
               
                    if(phoneCallDays > 7){                       
                        
                        
                        for(let j = 0; j < phoneCallDays; j++){
                            if(j % 7 === 0 && i <= 3){
                                // the day if modulus of 7
                                let { visit_date } =  fistPhasePhaneCalls(j, data[i].visit_date);
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
                                console.log(data[i].visit_date ,': count and date v1 ',new Date(visit_date).toLocaleDateString('sv'))

                            }
                            
                           
                        }
                        console.log( 'End of visit ----------------------------------------------- ',i)
                        

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
        async getUserPrograam(){
            try {
                const userProg = await userProgram.find();
               // getAllVisits();
                
                return userProg;
                
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

        async postUserPogram(_,arg,context,info){
            console.log("save enrollement 1")
  

            const {userId, programId,enrollStatus,enrollment_date} = arg.data;

            const recordExits = await userProgram.findOne({userId,programId});
            const userIdObj = new mongoose.Types.ObjectId(userId);
            const programIdObj = new mongoose.Types.ObjectId(programId)
            
            const visitReturned =  await firstVisitPopulate();

            const newDate = new Date(new Date().setDate(new Date().getDate() + 7))

           

            
            if(!recordExits){
                console.log("save enrollement 2")
                const newUserProgram = new userProgram({
                    userId: userIdObj,
                    programId: programIdObj,
                    enrollStatus: enrollStatus,
                    status: 1,
                    enrollment_date: enrollment_date,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                
                // save data then update service provision table
                const res = await newUserProgram.save().then(res =>{
                    console.log("save enrollement 3")
                    /* // compose service data
                    const data = {
                        visitId: visitReturned._id,
                        userId: userIdObj,
                        visitType: 1,
                        visitDate: new Date(),
                        serviceOfferedId: programIdObj , // to be changed
                        nextVisitdate: new Date(new Date().setDate(new Date().getDate() + 7)),
                        date_created: new Date(),
                        date_updated: new Date(),
                        status: 1
                    }
                    // save data in service provision table
                     saveFIrstVisitService(data) */

                     // Populate all the client visits
                     getAllVisits(userId, enrollment_date);


                });
                console.log("save enrollement 4")
    
                return {
                    ...res._doc,
                    id: res._id,
                    message: 'Save successfully'
                }

            }else {
                throw new UserInputError(` ${userId} already exists in ${userId}`);
            }

            


        }

    }
}