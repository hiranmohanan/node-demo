const router = require('express').Router();
const user=require('../modules/user/user');

router.post('/user',async(req,res)=>{
    const name=req.body?.name;
    const password=req.body?.password;
    const email=req.body?.email;
    const phone=req.body?.phone;
    const id=req.body?.id;
    const role=req.body?.role;

    const result=await user.usercreation(name,password,email,phone,id,role);

    if(!result?.affectedRows) return res.json({"success":false,"message":"Error while creating user."});

    return res.json({success:true,message:"User created successfully."});

});
router.post('/userlogin',async(req,res)=>{
    const name=req.body?.name;
    const password=req.body?.password;

    const result=await user.userlogin(name,password);
    

   if(result.success){
         return res.json({success:true,message:"Login success."});
    
    }
    else{
        return res.json({success:false,message:result.message});
    }
    
}
);

module.exports = router;