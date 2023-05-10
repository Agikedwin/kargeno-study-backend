const  UserLevel  = require('../../models/UserLevel');
const { validateLevel } = require('../../utils/Validators');
const { UserInputError } = require('apollo-server');

const getNextSequence= async () =>{
    const res =await  UserLevel.find().count();
    console.log('rest at generate id',res);
    return res + 1;
 }

module.exports = {

 

    Query: {
        async getLevels () {
/*             try{
                const level = await UserLevel.find();
                return level;
            } catch(e){
                console.log('Error getting levels', e);
            }   */   
            let data = [];
            
            try {
                const res = await UserLevel.aggregate([
                    
                    {
                    $lookup: {
                        from: "designations",
                        localField: "level_obId",
                        foreignField: "level_id",
                        as:  "designations"

                    }
                } 
                ]).then((result) => {
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

       
        async createLevel(_, args, info){
            console.log('Creating level', args.levelIput);
            const { level_name, description} = args.levelIput
            console.log(description,'  Creating level ',level_name);

            const { errors, valid } = validateLevel(level_name)
            if(!valid){
                console.log(valid , '  Validation failed', errors);
                throw new UserInputError('Errors', {errors});
            }

            level_id = await getNextSequence();

            console.log('level auto id ' ,level_id)

            const newLevel = new UserLevel(
                {
                level_id: level_id,
                level_name: level_name,
                description: description,
                date_created: new Date(),
                date_updated: new Date(),  
                }
            )

            try {
                const res = await newLevel.save();
                console.log('Level Record Saved Successfully');
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
