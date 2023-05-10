module.exports.fistPhaseVisits = (days, date)=> {

   
         date = new Date(date)
        date.setDate(date.getDate() + days)
        console.log(date, ' *** addDaysSecondPhase 2 : ',date)


        return {
            visit_date: date,
        }
}


module.exports.thirdVisitsPhase = (days, date) =>{ 
    date = new Date(date)
    
    date.setDate(date.getDate() + days)

    console.log(date, ' *** addDaysSecondPhase : ',date)
    return  {
        visit_date: date,
    }
  }

  module.exports.fistPhasePhaneCalls = (days, date)=> {

   
    date = new Date(date)
   date.setDate(date.getDate() + days)
   //console.log(date, ' *** fistPhasePhaneCalls 2 : ',date)


   return {
       visit_date: date,
   }
}


  module.exports.thirdPhasePhoneCall= (days, date) =>{ 
    date = new Date(date)
    
    date.setDate(date.getDate() + days)

    //console.log(date, ' *** thirdPhasePhoneCall : ',date)
    return  {
        visit_date: date,
    }
  }