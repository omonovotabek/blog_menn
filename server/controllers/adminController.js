const Admin = require('../models/AdminModel')
const bcrypt = require('bcrypt')

signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    let admin = await Admin.findOne({email})
    if(admin)
      return res.status(400).json({message: 'Bu email orqali ro\'yhatdan o\'tilgan'})
    
    admin = new Admin ({
        firstName, lastName, email, password
    })
    
    admin.firstName = admin.firstNameCapitalise()
    admin.lastName = admin.lastNameCapitalise()
    admin.password = await bcrypt.hash(password, 10)
    await admin.save()
    res.status(201).json(admin)
  } catch (e) {
    res.status(400).json(e.message)
  }
}

signIn = async (req, res) => {
    try {
      const {email, password} = req.body

      const admin = await Admin.findOne({email})     
      if(!admin)
        return res.status(404).json({message: 'Email yoki parol notog\'ri'})
       
      const isPasswordValid = await bcrypt.compare(password, admin.password)
      if(!isPasswordValid)
        return res.status(404).json({message: 'Email yoki parol notog\'ri'})
        
      const token = admin.generateAuthToken()
      res.header('x-auth-token', token).send(true)
    } catch (e) {
      res.status(400).json(e.message)
    }
}

module.exports = {
    signIn, signUp
}