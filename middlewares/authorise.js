const express = require("express");
const jwt = require("jsonwebtoken");


const authorise = (role) => {
    
    
    
    
   return (req, res, next) => {
        
        const role= req.body.role
        
        if (role.includes(role)) {
            next()
        } else {
            res.send({"message":"U are not authrised"})
        }
           
    }


    
};

module.exports = { authorise };