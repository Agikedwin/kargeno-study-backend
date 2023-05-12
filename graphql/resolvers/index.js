const userResolvers = require('./User');
const levelResolvers = require('./Level');
const designationResolvers = require('./Designation');
const programResolvers = require('./Programs');
const userPrgramResolvers = require('./UserProgramEnrolled');
const visitsResolvers = require('./Visits');
const servicesResolvers = require('./Services');
const checkInUsersResolvers = require('./CheckInUser');
const physicalServicesResolvers = require('./PhysicalVisitServices');
const phoneCallServicesResolvers = require('./PhoneVisitServices');
const allTypesOfVisits = require('./allVisitTypes');
const rescheduledVisits = require('./RecheduledVisits');

module.exports = {
     Query: {
      ...userResolvers.Query,
      ...levelResolvers.Query,
      ...designationResolvers.Query,
      ...programResolvers.Query,
      ...userPrgramResolvers.Query,
      ...visitsResolvers.Query,
      ...servicesResolvers.Query,
      ...checkInUsersResolvers.Query,
      ...allTypesOfVisits.Query,
      ...physicalServicesResolvers.Ouery,
      ...phoneCallServicesResolvers.Query,
      ...rescheduledVisits.Query
    },
 
    Mutation: {
        ...userResolvers.Mutation,
        ...levelResolvers.Mutation,
        ...designationResolvers.Mutation,
        ...programResolvers.Mutation,
        ...userPrgramResolvers.Mutation,
        ...visitsResolvers.Mutation,
        ...servicesResolvers.Mutation,
        ...checkInUsersResolvers.Mutation,
        ...physicalServicesResolvers.Mutation,
        ...phoneCallServicesResolvers.Mutation,
        ...rescheduledVisits.Mutation

    }
}