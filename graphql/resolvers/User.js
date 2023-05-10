const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {SECRET_KEY} = require('../../config/index');

const User = require('../../models/User');
const Designation = require('../../models/Designation');

const { validateCreateUser, validateLogin, validateLevel } = require('../../utils/Validators');
var mongoose = require('mongoose');

const checkAuth = require('../../utils/check.auth');

function generateToken(user) {
    return  jwt.sign({
        surname: user.surname,
        email: user.email,
        id: user.id

    }, SECRET_KEY, {expiresIn: '1h'});


}

module.exports = {
     Query: {
        async getUsers(_, paramId, contex){
              /*   db.Order.aggregate({ $lookup:     {         from: "Products",         localField: "item",         foreignField : "_id",         as: "ordered_product"     } },{
                   //$unwind: "$desigs"
                } ) */
                selectedUserId = paramId.paramId
                

               
                let data = [];
                let queryCondition = {}
                if(selectedUserId){
                    queryCondition  = {
                        "_id": new mongoose.Types.ObjectId(selectedUserId)
                        //"userJoin.name": "foo" */                        
                    }

                }else{
                    queryCondition = {}
                }

                console.log('the id passed is queryCondition ', queryCondition)
             
                try {
                    const res = await User.aggregate([
                        
                         {
                            
                        $lookup: {
                            from: "designations",
                            localField: "level_id",
                            foreignField: "level_id",
                            as:  "designation"
                        }
                    }   ,
                     /* {
                        $unwind: "$user"
                    } ,  */
                    {
                        $lookup:{
                            from: "userlevels", 
                            localField: "level_id", 
                            foreignField: "level_id",
                            as: "level"
                            
                        }
                    },
                   /*  {   $unwind:"$levels" },   */
                     {
                        $match: queryCondition
                      } 
                 
    
                    ]).then((result) => {
                       // console.log(result);
                        /* data =  result.filter(val => {
                            return val.userlevels.length > 0
                        }) */
                        data = result;
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
        async login(_, {username,password}){
            const {errors,valid} = validateLogin(username, password);
           
           if(!valid) {
            throw new UserInputError('Errors', {errors})
           }
            const user = await User.findOne({username});

            if(!user){
                errors.general = 'User not found ';

                throw new UserInputError('User not found ', {errors})
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
            errors.general = 'Wrong crdentials';

            throw new UserInputError('Wrong crdentials', {errors})

            }
           const token =  generateToken(user);
           console.log('Token generated', token);

           return {
            ...user._doc,
            id: user._id,
            token
           }
            

        },
       async createUser(parent, args,context, info){
        //const user = checkAuth(context);
       
        const  {surname, other_names, phone_number,level_id, designation_id, patient_identifier, email, dob,gender} = args.data


       const {valid, errors} =  validateCreateUser(surname, other_names, phone_number,designation_id, patient_identifier, email, dob,gender)
        console.log('The validator ',valid, errors)
        if (!valid) {
            throw new UserInputError('Errors', {errors});
        }
        const userExits = await User.findOne({ surname });
        
        if(userExits){
            
            throw new UserInputError('Username already taken',{
            errors: {
                surname: 'This username is  taken'
            }
        });
        }

        password = await bcrypt.hash(surname, 12)

        const newUser = new User({
            surname: surname,
            other_names: other_names,
            phone_number: phone_number,
            patient_identifier: patient_identifier,
            designation_id: designation_id,
            level_id: level_id,
            dob: dob,
            patient_identifier: patient_identifier,
            email: email,
            gender: gender,
            username: surname,
            password: password ,
            editor: surname,
            date_created: new Date(),
            date_updated: new Date(),
            status: 0
        })

        try {
            
            const res = await newUser.save();
            console.log('User Record Saved Successfully');

        const token = generateToken(res);
        return {
            ...res._doc,
            id: res._id,
            token
           }

        } catch (err) {
            console.error('Error Saving  User ',err);
            throw new Error(err);
           
            
        }

        }
    }


}