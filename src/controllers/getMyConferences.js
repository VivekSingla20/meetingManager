const pool = require("../dbconfig");
const jwt = require("jsonwebtoken");
const getMyConferences = (req,res)=>{
    const decodedToken = jwt.decode(req.cookies.token);
    const id= decodedToken.id;
    const sql= `Select * from member${id};`;
    pool.query(sql,(err,result,fields)=>{
        if(err){
            throw err
        }
        else{
            res.send(result);
        }
    });
}
module.exports=getMyConferences;