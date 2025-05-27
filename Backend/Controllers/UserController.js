const UserSchema = require('./../Module/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userSignUp = async (req, res) => {

    const { fullName, emailId, password } = req.body;
    if (!fullName || !emailId || !password) {
        return res.status(400).json({ SUCCESS: false, MESSAGE: 'All fileds are required' })
    }
    const emailIdExists = await UserSchema.findOne({ emailId });
    if (emailIdExists) {
        return res.status(400).json({ SUCCESS: false, MESSAGE: 'Email Id already exists' })
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new UserSchema({ fullName, emailId, password: hashPassword })
    try {
        const saveUser = await user.save();
        res.status(201).json({ SUCCESS: true, MESSAGE: "User successfully SignUp", DATA: saveUser })
    } catch (error) {
        res.status(500).json({ MESSAGE: error.message })
    }

}

exports.userSignIn = async (req, res) => {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
        return res.status(400).json({ SUCCESS: false, MESSAGE: 'EmailId and Password are required' })
    }
    const user = await UserSchema.findOne({ emailId });
    if (!user) {
        return res.status(400).json({ SUCCESS: false, MESSAGE: 'EmailId not found' })
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        return res.status(400).json({ SUCCESS: false, MESSAGE: 'Invalid Password' })
    }
    try{
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRETKey)
        return res.status(200).json({ SUCCESS: true, token:token, DATA:user, MESSAGE: 'User signIn successfully' })
    }catch (error) {    
        return res.status(500).json({ SUCCESS: false, MESSAGE: error.message })
    }
}