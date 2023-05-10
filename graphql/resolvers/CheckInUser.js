
const { UserInputError } = require('apollo-server');


const CheckInUser = require('../../models/CheckInUser');

const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');

const checkAuth = require('../../utils/check.auth');

module.exports = {
    Query: {
        async getCheckInUser(){
            try {
                const checkInUser = await CheckInUser.find();
                return checkInUser;
                
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
       
        async postCheckInUser(_,arg,context,info){
  

            const {userId, programId,visitId,status} = arg.data;

            const recordExits = await CheckInUser.findOne({userId,programId,visitId});
            
            if(!recordExits){
                const newCheckInUser = new CheckInUser({
                    userId: userId,
                    programId: programId,
                    visitId: visitId,
                    status: status,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
    
                const res = await newCheckInUser.save();
    
                return {
                    ...res._doc,
                    id: res._id,
                    message: 'Save successfully'
                }

            }else {
                throw new UserInputError(` ${userId} already checkec in for visit ${visitId}  `);
            }

            


        }

    }
}