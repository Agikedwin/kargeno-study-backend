const  rescheduledVisits  = require('../../models/RecheduledVisits');
const { validateLevel } = require('../../utils/Validators');
const { UserInputError } = require('apollo-server');

const getNextSequence= async () =>{
    const res =await  UserLevel.find().count();
    console.log('rest at generate id',res);
    return res + 1;
 }

module.exports = {

 

    Query: {
        async getRescheduledVisits () {

            let data = [];
            
            try {
                const res = await rescheduledVisits.find().then((result) => {
                    console.log(result);
                    data = result
                    //return result;
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                

            }catch(e){
                console.log('Error getting all designations', e);
            }
             
            return data
        }
    },

    Mutation: {

       
        async postRescheduledVisits(_, args, info){
            console.log('Creating level', args.data[0]);
            const { physicalVisitId, userId,visitId,rescheduled_date,visit_date } = args.data[0]


            const newRescheduledVisits = new rescheduledVisits(
                {
                physicalVisitId: physicalVisitId,
                userId: userId,
                visitId: visitId,
                rescheduled_date: new Date(rescheduled_date),
                visit_date: new Date(visit_date),
                date_created: new Date(),
                date_updated: new Date(),  
                }
            )

            try {
                const res = await newRescheduledVisits.save();
                console.log('Visit Reschedule Saved Successfully');
                return {
                    ...res._doc,
                    id: res._id,
                }

            }catch (e) {
                console.log(e)
            }


            
        }

    }
}
