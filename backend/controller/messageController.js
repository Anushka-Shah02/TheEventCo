import { Message } from "../models/messageSchema.js";

export const sendMessage=async(req,res)=>{

    try{
        const {name,email,subject,message}=req.body;
     if (!name || !email || !subject || !message ){
        return res.status(400).json({
            success: false,
            message:"All fields are required",
        });
     }
     await Message.create({name,email,subject,message});
     res.status(200).json({
        success:true,
        message:"Message send successfully"
    });

    }
    catch(e){

        if(e.name === "ValidationError"){
            let errorMessage="";
            if(e.errors.name)
            {
                errorMessage += e.errors.name.message + " ";
            }
            if(e.errors.email)
            {
                errorMessage += e.errors.email.message + " ";
            }
            if(e.errors.subject)
            {
                errorMessage += e.errors.subject.message + " ";
            }
            if(e.errors.message)
            {
                errorMessage += e.errors.message.message + " ";
            }

            return res.status(400).json({
                success:false,
                message:errorMessage
            });
        }

        return res.status(500).json({
            success: false,
            message:"Unknown error"
        });
    }
     
}