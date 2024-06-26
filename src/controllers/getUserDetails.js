const pool = require("../dbconfig");
const jwt = require("jsonwebtoken");
const app= require("../index");
const getUserDetails = (req,res)=>{
    const decodedToken = jwt.decode(req.cookies.token);
    const id= decodedToken.id;
    const sql= `SELECT * FROM member where Sno=${id};`;
    pool.query(sql,id,(err,result,fields)=>{
        if(err){
            throw err
        }
        else{
            res.send(result);
        }
    });
}
module.exports=getUserDetails;