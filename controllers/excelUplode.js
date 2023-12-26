const ExcelUplode= async(req,res)=>{
 
    try {
          res.send({status:200,success:true,mass:'running'});
    } catch (error) {
        res.send({status:400,success:false,mass:'not running'});
    }
}

module.exports ={
    ExcelUplode 
};