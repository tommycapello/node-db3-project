const db = require('../../data/db-config')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try{
    const existingID = await db('schemes').where('scheme_id', req.params.scheme_id).first()
    if(!existingID){
      next({status: 404 , message: `scheme with scheme_id ${req.params.scheme_id} not found`})
    }
    else{
      next()
    }
  }
  catch(err){
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/

const validateScheme = (req, res, next) => {
  try{
    const {scheme_name} = req.body
    if(
      !scheme_name || typeof scheme_name !== 'string'
    ){
      next({status:400, message: "invalid scheme_name"})
    }
    else{
      next()
    }
  }
  catch(err){
    next(err)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
