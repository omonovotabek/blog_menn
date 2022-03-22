const Admin = require('../models/AdminModel')
const bcrypt = require('bcrypt')

signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    let admin = await Admin.findOne({email})
    if(admin)
      return res.status(401).json({
        name: 'unauthorized',
        message: 'Bu email orqali ro\'yhatdan o\'tilgan'
      })
     
    admin = new Admin ({
        firstName, lastName, email, password
    })
    
    admin.firstName = admin.firstNameCapitalise()
    admin.lastName = admin.lastNameCapitalise()
    admin.password = await bcrypt.hash(password, 10)
    await admin.save()
    res.status(201).json({message:"Yangi foydalanuvchi qo'shildi"})
  } catch (e) {
    res.status(400).json({
      name: 'badRequest',
      message:"Notogri sorov"
    })
    console.log(e.message)
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
      res.header('x-auth-token', token)
      .json({
        token,
        message:"Admin panelga hush kelibsiz"
      })
    } catch (e) {
      console.log(e.message);
    }
}

module.exports = {
    signIn, signUp
}