const Designation = require('../../models/Designation');
const {validateDesignation} = require('../../utils/Validators');
const { UserInputError } = require('apollo-server');

const getNextSequence= async () =>{
    const res =await  Designation.find().count();
    console.log('rest at generate id',res);
    return res + 1;
 }

module.exports = {

    Query: {
        async getAllDesignations(){
         /*   db.Order.aggregate({ $lookup:     {         from: "Products",         localField: "item",         foreignField : "_id",         as: "ordered_product"     } },{
                   //$unwind: "$desigs"
                } ) */
            console.log(' getting all designations');
            let data = [];
         
            try {
                const res = await Designation.aggregate([
                    
                     {
                        
                    $lookup: {
                        from: "userlevels",
                        localField: "level_id",
                        foreignField: "level_id",
                        as:  "userlevels"
                    }
                }  /* ,
                {
                    $unwind: "$userlevels"
                }  */ 
               /*  {

                    $lookup:{
                        from: 'userlevels',
                        let: {level_name: '$designation_name'},
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $eq: ['$designation_name', '$$level_name']
                                }
                             }
                       }],
                       as: 'addressInfo'
                    }
                }    */ 

                ]).then((result) => {
                    //console.log(result.userlevels);
                    data =  result.filter(val => {
                        return val.userlevels.length > 0
                    })
                   // data = result
                    //return result;
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                

            }catch(e){
                console.log('Error getting all designations', e);
            }
            
            return data;
             
        } 
    },

    Mutation: {
        async createDesignations(_, args,info){

            console.log('Saving designation  ::: --------------- ',args.data)

            designation_name = args.data.designation_name; 
            level_id = args.data.level_id;
            description = args.data.description;
            
            
            const designationExits = await Designation.findOne({designation_name});

            if(designationExits){
                throw new UserInputError('Designation name is taken',{
                    errors:{
                        designation_name : 'Designation name is taken'
                    }
                })
            }


            const {valid, errors } = validateDesignation(designation_name, level_id);

            if(!valid){
                throw new UserInputError('Errors',{errors});
            }

            const auto_id = await getNextSequence();

            console.log(' getting all designations --------',auto_id);


            const newDesignations = new Designation({
                designation_name: designation_name,
                description : description,
                designation_id: auto_id,
                level_id : level_id,
                level_obId : level_id,
                date_created : new Date(),
                date_updated : new Date(),
                
            })

            try {
                const res = await newDesignations.save();                

                return {
                    ...res._doc,
                    id: res._id,
                }

            }catch(e){
                console.log('Error creating designations', e);
            }
        }

    }
}