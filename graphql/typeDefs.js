const { gql } = require('apollo-server');


module.exports = gql `
type User {
    _id: ID!,
    surname: String!,
    other_names: String,
    designation_id: Int!,
    level_id: Int,
    dob: String,
    email: String,
    phone_number: String,
    patient_identifier: String!,
    gender: String,
    username: String!,
    password:  String!,
    status: Int,
    editor: String,
    date_created: String,
    date_updated: String,
    token: String
    
    }

    input UserInput {
    surname: String!,
    other_names: String,
    phone_number: String,
    designation_id: Int!,
    level_id: Int,
    dob: String,
    email: String,
    gender: String,
    patient_identifier: String!,
    username: String,
    password:  String,
    status: Int,
    editor: String,
    date_created: String,
    date_updated: String,
    }
type UserQuery  {
    _id: ID!,
    surname: String!,
    other_names: String,
    designation_id: Int!,
    level_id: Int,
    dob: String,
    email: String,
    phone_number: String,
    patient_identifier: String!,
    gender: String,
    username: String!,
    password:  String!,
    status: Int,
    editor: String,
    date_created: String,
    date_updated: String,
    token: String,
    designation: [DesignationObj],
    level: [Level]

}
type userDesignation {
 designation_id: ID,
 designation_name: String
}

input userDesignationInput {
 designation_id: ID,
 designation_name: String
}

type Level {
    _id: ID,
    level_name: String,
    description: String,
    date_created: String,
    date_updated: String,
    level_id: Int
    


    designations: [Designation]

}

input LevelInput {
    level_id: Int,
    level_name: String,
    description: String,
    date_created: String,
    date_updated: String,
    
}
type DesignationObj {
    _id: ID!,
    description: String, 
    designation_name: String, 
    editor: String, 
    level_id: Int!,   
    date_created: String,
    date_updated: String,
    level_obId: ID!,
    designation_id: Int!

    

}

type Designation {
    _id: ID!,
    description: String, 
    designation_name: String, 
    editor: String, 
    level_id: Int!,   
    date_created: String,
    date_updated: String,
    level_obId: ID!,
    userlevels: [Level]
    designation_id: Int!

    

}
input DesignationInput {
    description: String, 
    designation_name: String, 
    editor: String, 
    level_id: Int!,   
    date_created: String,
    date_updated: String,
    level_obId:  String,
    designation_id: Int,

}

#program
type Programs {
    id: ID!
    programName: String,
    owner: String,
    description: String,
    date_created: String,
    date_updated: String,
    status: Int,
    
}

input ProgramInput {
    programName: String,
    owner: String,
    description: String,
    date_created: String,
    date_updated: String,
    status: Int
}

# user program
type UserProgram{
    id: ID!,
    userId: ID!,
    programId: ID!,
    enrollStatus: Boolean,
    enrollment_date: String,
    date_created: String,
    date_updated: String,
    status: Int,
}

input UserProgramInput {
    userId: ID!,
    programId:ID!,
    enrollStatus: Boolean,
    enrollment_date: String,
    date_created: String,
    date_updated: String,
    status: Int,
}

# Visits

type Visits {
    id: ID!,
    visitName: String,
    visitNumber: String,
    program_id: ID,
    windowPeriod: String,
    dayFromBaseDate: String,
    description: String,
    date_created: String,
    date_updated: String,
    status: String,
}

input VisitsInput {
    visitName: String,
    visitNumber: String,
    windowPeriod: String,
    program_id: String!,
    dayFromBaseDate: String,
    description: String,
    date_created: String,
    date_updated: String,
    status: String,
}

#Services

type Services {
    id: ID!,
    visitId: String,
    serviceName: String,
    duration: String,
    description: String,
    date_created: String,
    date_updated: String,
    status: String,
}

input ServicesInput {
    visitId: String,
    serviceName: String,
    duration: String,
    description: String,
    date_created: String,
    date_updated: String,
    status: String,
}


#check users

type CheckInUser {
    id:ID!,
    userId: ID!,
    programId: String,
    visitId:ID!,
    date_created: String,
    date_updated: String,
    status: String,
}

input CheckInUserInput {
    userId:ID!,
    programId: ID!,
    visitId: ID!,
    date_created: String,
    date_updated: String,
    status: String,
}


#Services provided
input visitTypeInput {
active: Boolean,
typeId: Int,
typeName: String
}

type visitType {
active: Boolean,
typeId: Int,
typeName: String
}


type PhysicalServices {
    id: ID!,
    userId: ID!,
    visitId: ID!,
    visitType:Int,
    visitDate: String,
    serviceOfferedId: ID!,
    date_created: String,
    date_updated: String,
    status: Int,
    physicalVisitId: ID!
    visitNumber: String,
}


input PhysicalServicesInput {
    
    userId: ID!,
    visitId: ID!,
    visitType:Int,
    visitDate: String,
    serviceOfferedId: ID!,
    date_created: String,
    date_updated: String,
    status: Int,
    physicalVisitId: ID!
    visitNumber: String
}

type PhoneServices {
    _id: ID!,
    userId: ID!,
    visitId: ID!,
    visitType:Int,
    visitDate: String,
    serviceOfferedId: ID!,
    date_created: String,
    date_updated: String,
    status: Int,
    callVisitId: ID!
}


input PhoneServicesInput {
    
    userId: ID!,
    visitId: ID!,
    visitType:Int,
    visitDate: String,
    serviceOfferedId: ID!,
    date_created: String,
    date_updated: String,
    status: Int,
    callVisitId: ID!
}



input searParams {
    id: ID
    userId: ID
    visitId: ID
}

#phone call visits
type  PhoneCallVisits {
    _id: ID,
    userId: ID,
    visitId: ID,
    date_created:  String,
    date_updated:  String,
    visitStatus: Boolean,
    visit_date: String,
    status: Int,
}

#physical visits
type  PhysicalCallVisits {
    _id: ID,
    userId: ID,
    visitId: ID,
    date_created:  String,
    date_updated:  String,
    visitStatus: Boolean,
    visit_date: String,
    status: Int,
    
}

# All  visit types
type  AllVisitsTypes {
    _id: ID!,
    visitName: String,
    visitNumber: String,
    program_id: ID,
    windowPeriod: String,
    dayFromBaseDate: String,
    description: String,
    date_created: String,
    date_updated: String,
    physicalVisits: [PhysicalCallVisits]
    status: String,
    phoneCalls: [PhoneCallVisits]
    

    
}


type Query {
    getUsers(paramId: String): [UserQuery],
    getLevels(paramId: String): [Level],
    getAllDesignations(paramId: String): [Designation]
    getPrograams: [Programs]
    getUserPrograam(paramId: String): [UserProgram]
    getVisits(paramId: String): [Visits]
    getVisitServices(paramId: String): [Services]
    getCheckInUser(paramId: String): [CheckInUser]
    getPhysicalServices(paramId: String): [PhysicalServices]
    getPhoneServices(paramId: String): [PhoneServices]
    getLastServiceProvided(paramId: searParams): [PhysicalServices]
    getAllVisitTypes(paramId: String): [AllVisitsTypes]

}

type Mutation {
    createUser(data: UserInput): User,
    createLevel(data: LevelInput): Level
    createDesignations(data: DesignationInput): Designation
    login(username: String!, password: String!): User

    postPogram(data:ProgramInput):Programs
    postUserPogram(data: UserProgramInput): UserProgram
    postVisits(data:VisitsInput ): Visits
    postVisitServices(data:ServicesInput): Services
    postCheckInUser(data:CheckInUserInput ): CheckInUser
    postPhysicalServices(data:[PhysicalServicesInput]): PhysicalServices
    postPhoneServices(data:[PhoneServicesInput]): PhoneServices






   
    
}
`;
