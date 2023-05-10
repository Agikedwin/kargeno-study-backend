
const { UserInputError } = require('apollo-server');


const VisitsTypes = require('../../models/Visits');

const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');

const checkAuth = require('../../utils/check.auth');
var mongoose = require('mongoose');
const ServicesProvided = require('../../models/PhysicalVisitServices');



module.exports = {
    Query: {
        async getAllVisitTypes(_, paramId, context){
            selectedUserId = new mongoose.Types.ObjectId(paramId.paramId) 
            console.log('fetching all visit types ',selectedUserId);

                

               
            let data = [];
            let queryCondition = {}
        /*     if(selectedUserId){
                queryCondition  = {
                    "physicalVisits.userId": selectedUserId,
                    "phoneCalls.userId": selectedUserId
                    //"userJoin.name": "foo"                       
                }

            }else{
                queryCondition = {}
            }*/  
 
            try {

                const res = await VisitsTypes.aggregate([{
                    $lookup: {
                      from: "phonecallvisits",
                      localField: "_id",
                      foreignField: "visitId",
                      as: "phone_v"
                    }
                  },
                  {
                $lookup: {
                      from: "physicalvisits",
                      localField: "_id",
                      foreignField: "visitId",
                      as: "physical_v"
                    }
                  },
                  {
                    $addFields: {
                      phoneCalls: {
                        $filter: {
                          input: "$phone_v",
                          cond: { $eq: ["$$this.userId", selectedUserId] }
                        }
                      }
                    }
                  },
                   {
                    $addFields: {
                      physicalVisits: {
                        $filter: {
                          input: "$physical_v",
                          cond: { $eq: ["$$this.userId", selectedUserId] }
                        }
                      }
                    }
                  }
                  ]).then((result) => {
                    
                    data = result;
                    console.log(data);
                    /* const test = data.physicalVisits.filter(res => { res.userId == selectedUserId 
                        console.log('ALL VISIT TYPES', res.physicalVisits.userId);
                    }) */
                    
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                

            }catch(e){
                console.log('Error getting all designations', e);
            }
            
            return data;

           

        },

    },

    
}