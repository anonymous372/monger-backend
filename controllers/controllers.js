import User from "../models/user.js"
import bcrypt from "bcrypt"

export const registerUser = async (req,res) => {
    const {username, password} = req.body
    console.log(req.body)
    try {
        console.log(username,password)
        // Create hash
        const hash = await bcrypt.hash(password, 10)
        console.log("Hash created", hash)

        const newUser = new User({username,password: hash})
        await newUser.save()
        
        console.log("New User Created",newUser)
        res.status(201).json({newUser})

    } catch (error) {
        console.log("Unable to register User")
        res.status(409).json({message: error.message})
    }
}

export const loginUser = async (req,res) => {
    const {username, password} = req.body
    console.log(req.body)
    try {
        const foundUser = await User.findOne({username})
        const hash = foundUser.password
        bcrypt.compare(password, hash,(err,res) => {
            if(err) console.log(err)
            else{
                if(res){
                    console.log("Hooray")
                } else{
                    console.log("Password Does not match")
                }
            }   
        })
       res.status(200).json({foundUser})
    } catch (error) {
        console.log("Unable to login User")
        res.status(409).json({message: error.message})
    }  
}



