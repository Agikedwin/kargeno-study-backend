
const { UserInputError } = require('apollo-server');


const Program = require('../../models/Programs');

const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');

const checkAuth = require('../../utils/check.auth');

module.exports = {
    Query: {
        async getPrograams(){
            try {
                const program = await Program.find();
                return program;
                
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

        async postPogram(_,arg,context,info){

            const {programName, owner, description, status} = arg.data;

            const programExixts = await Program.findOne({programName});
            
            if(!programExixts){
                const newProgram = new Program({
                    programName: programName,
                    owner: owner,
                    description: description,
                    date_created: new Date(),
                    date_updated: new Date(),
                    status: 1
                });
    
                const res = await newProgram.save();
    
                return {
                    ...res._doc,
                    id: res._id,
                    message: 'Success'
                }

            }else {
                throw new UserInputError(`Program ${programName} already exists `);
            }

            


        }

    }
}