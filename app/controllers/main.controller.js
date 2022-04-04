const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');


const signUp = (req, res) => {
    User.find({ username: req.body.username })
        .then(resualt => {
            if (resualt.length < 1) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(404)
                            .json({ massage: err })
                    }
                    else {
                        const user = new User({
                            username: req.body.username,
                            password: hash
                        })

                        user.save()
                            .then(resualt => {
                                console.log(resualt)
                                res.status(200)
                                    .json({
                                        massage: 'User Already Create'
                                    })

                            }).catch(err => {
                                res.status(404)
                                    .json({
                                        massage: err.massage
                                    })
                            })

                    }
                })
            } else {
                res.status(404)
                    .json({
                        massage: 'This User Aleardy Craete20'
                    })
            }

        }).catch(err => {
            res.status(404)
                .json({
                    massage: err
                })
        })

}


const signIn = (req, res) => {
    User.find({ username: req.body.username })
        .then(user => {
            if (user.length >= 1) {
                bcrypt.compare(req.body.password, user[0].password)
                    .then(resault => {
                        if (resault) {
                      const token=  jwt.sign({
                            email:user[0].email,
                            userId:user[0]._id
                        },'scrite12' ,{
                            expiresIn:'1h'
                        })
                            res.status(200).json({
                                massage: 'Sign Success',
                                token :token
                            })
                        }
                        else {
                            res.status(404).json({
                                massage: err
                            })

                        }
                    })
                    .catch(err => {
                        res.status(404).json({
                            massage: err
                        })
                    })
            }
            else{

            res.status(404).json({
                massage: "Wrong User Name"
            
            }) }
        })
        .catch(err => {
            res.status(404).json({
                massage: err
            })
        })

}

const updateUser=(req,res)=>{
    bcrypt.hash(req.body.password ,10)
    .then( hash=>{
        const user1={
            username:req.body.username,
            password:hash
        }
        User.findByIdAndUpdate({_id :req.params.id} ,{$set :user1})
        .then(resault=>{
            if(resault){
                res.status(200).json({
                    massage :"User Was Update"
                })
            }
            else{
                res.status(404).json({
                    massage :"User Not Found"
                })
            }
        })
        .catch(err=>{
            res.status(404).json({
                 massage :err
            })
        })
    }

    )
    .catch(err=>{
      res.status(404).json({
          massage :err
      })
    })
}


const deleteUser=(req,res)=>{
    User.findByIdAndDelete({_id :req.params.id}).
    then(resault=>{
        if(resault){
            res.status(200).json({
                massage:"User Was Delete"
            })
        }else{
            res.status(404).json({
                massage:"User Not Found"
            })
        }
    })
    .catch(err=>{
        res.status(404).json({
            massage :err
        })
    })
}


module.exports = {
    signUp,
    signIn,
    updateUser,
    deleteUser

}