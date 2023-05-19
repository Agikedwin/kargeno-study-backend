
const { UserInputError } = require('apollo-server');


const VisitsTypes = require('../../models/Visits');
const PhysicalVisits = require('../../models/PhysicalVisits');


const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');

const checkAuth = require('../../utils/check.auth');
var mongoose = require('mongoose');
const ServicesProvided = require('../../models/PhysicalVisitServices');



module.exports = {
  //
    Query: {
        async getAllVisitTypes(_, paramId, context){
            selectedUserId = new mongoose.Types.ObjectId(paramId.paramId) 
            console.log('fetching all visit types ',selectedUserId);

                

               
            let data = [];
            let queryCondition = {}
       
 
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
                    
                    
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                

            }catch(e){
                console.log('Error getting all designations', e);
            }
            
            return data; 

           

        },

        async getAllVisitTypesSummary(_, paramId, context){
          selectedDate = paramId.paramId;
          console.log('fetching all visit types ***************************************** ',selectedDate);

              

             
          let data = [];
          let queryCondition = {}     

          try {

            const res = await VisitsTypes.aggregate([{
                $lookup: {
                  from: "phonecallvisits",
                  localField: "_id",
                  foreignField: "visitId",
                  as: "phoneCalls_v"
                }
              },
              {
            $lookup: {
                  from: "physicalvisits",
                  localField: "_id",
                  foreignField: "visitId",
                  as: "physicalVisits_v"
                }
              },
              {
                $addFields: {
                  phoneCalls: {
                    $filter: {
                      input: "$phoneCalls_v",
                      cond: { $eq: ["$$this.visit_date" , selectedDate] }
                    }
                  }
                }
              },
               {
                $addFields: {
                  physicalVisits: {
                    $filter: {
                      input: "$physicalVisits_v",
                      cond: { $eq: ["$$this.visit_date" , selectedDate] }
                    }
                  }
                }
              }
              ]).then((result) => {
                
                data = result;
                //console.log(data);
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

      // Get All visits made by  a user

      async getAllVisitsMade(_,paramId,context){
        selectedDate = paramId.paramId;
        console.log('Get All visits made by  a user ***************************************** ',selectedDate);

            

           
        let data = [];
        let queryCondition = {}     

        try {

          const res = await PhysicalVisits.aggregate([
            {
                            $match: {
                               // "visit_date": "2023-04-01"
                            }
                        },
        {
                    $lookup: {
                        from: "users",
                        let: { "userId": "$userId" ,"visitId": "$visitId"  },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$_id", "$$userId"] }
                                }
                            },
                            {
                                $lookup: {
                                    from: "userlevels",
                                    let: {"level_id": "$level_id"  },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: { $eq: ["$level_id", "$$level_id"] }
                                            }
                                        },
                                    ],
                                    as: "level"
                                },
                            },
                            {
                                $lookup: {
                                    from: "designations",
                                    let: {"level_id": "$level_id"  },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: { $eq: ["$level_id", "$$level_id"] }
                                            }
                                        },
                                    ],
                                    as: "designation"
                                },
                            },
                            {
                                $lookup: {
                                    from: "phonecallvisits",
                                    pipeline: [
                                        {
                                            $match: {
                                                "visit_date": selectedDate,
                                                $expr: { $eq: ["$visitId", "$$visitId"] }
                                            }
                                        },
                                    ],
                                    as: "phonecalls"
                                },
                            },
                            {
                                $lookup: {
                                    from: "visits",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: { $eq: ["$_id", "$$visitId"] }
                                            }
                                        },
                                    ],
                                    as: "visits"
                                },
                            },
                        ],
                        as: "users"
                    }
                } ]).then((result) => {

                  data = result.filter(res => res.visit_date == selectedDate )
              
              //data = result;
              //console.log(data.users);
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