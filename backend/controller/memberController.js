const Member = require('../model/Member'); 
const careViewApi = require("../utils/CareviewApi"); 


const getAllMembers = async (req, res) => {
  
    const members = await Member.find(); 
    if(!members) return res.status(204).json({'message': 'No Members found'}); 
    
    res.json(members);
}



const createNewMember = async (req, res) => {
  
    if(!req?.body?.name || !req?.body?.ndis || !req?.body?.community) return res.status(400).json({'message' : 'name and ndis names are required'}); 

    const isMember = await careViewApi(req.body.ndis);
    if(isMember === false) return res.status(404).json({'message': `No member with ${req.body.ndis} exists in DC plan management`})

    try {
        
        const result = await Member.create({
            name: req.body.name,
            ndis:req.body.ndis, 
            community:req.body.community
        })

        res.status(201).json(result);

    } catch (error) {
        
        console.log(error);
    }
}

const updateMember = async (req, res) =>{

    if(!req?.body?.id) return res.status(400).json({'message' : 'ID parameter required'}); 

    const member = await Member.findOne({_id:req.body.id}).exec();

    if(!member) return res.status(204).json({'message' : `No employee matches ${req.body.id}`});

    if(req.body?.name){
        member.name = req.body.name;
    }

    if(req.body?.ndis){
        member.ndis = req.body.ndis;
    }

    if(req.body?.community){
        member.ndis = req.body.ndis;
    }

    if(req.body?.isOver){
        member.isOver = Boolean(req.body.isOver);

        if(Boolean(req.body.isOver)){
            member.isUnder = false; 
        }
    }

    if(req.body?.isUnder){
        member.isOver = Boolean(req.body.isUnder);

        if(Boolean(req.body.isOver)){ 
            member.isOver = false; 
        }
    }

    const result = await member.save(); 
    res.json(result); 
}

const deleteMember = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({'message' : 'ID parameter required'}); 
  
    const member = await Member.findOne({_id: req.body.id}).exec();  
    if(!member){
          return res.status(204).json({'message':`${req.body.id} not found`}); 
    }
      
    const result = await member.deleteOne({_id : req.body.id});
    res.json(result); 
  }


  const getMember = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message' : 'ID parameter required'});
  
    const member = await Member.findOne({_id: req.params.id}).exec(); 
  
      if(!member){
          return res.status(204).json({'message':`${req.params.id} not found`}); 
      }
      
      const memberInfo = await careViewApi(member.ndis);
      
      
      

      res.json(memberInfo);
  }

  module.exports ={

    getAllMembers,
    createNewMember, 
    updateMember,
    deleteMember, 
    getMember
  }