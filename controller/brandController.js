const {
  brand, 
  item, 
  Sequelize
} = require('../models/index.js');

const Op = Sequelize.Op;

let self = {};

self.getAll = async (req, res) => {
  try{
    let data = await brand.findAll({});
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    res.status(500).json({
      status:'error',
      data:err
    });
  }
}

self.getWithItems = async (req, res) => {
  try{
    let data = await brand.findAll({
      include:['items'],
    });
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    return res.status(500).json({
      status:'error',
      data:err
    });
  }
}

self.get = async (req,res) => {
  try{
    let id = req.params.id;
    let data = await brand.findOne({
      where:{
        id:id
      }
    });
    return res.json({
      status:'ok',
      data:data
    });    
  }catch(err){
    return res.status(500).json({
      status:'error',
      data:err
    });
  }
}

self.search = async (req, res) => {
  try{
    let text = req.query.text;
    let data = await brand.findAll({
      where:{
        name: {
          [Op.like]:`%${text}%`
        }
      }
    });
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    return res.status(500).json({
      status:'error',
      data:err
    });
  }
}

self.save = async (req, res) => {
  try{
    let data = await brand.create(req.body);
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    res.status(500).json({
      status:'error',
      data:err
    });
  }
}

self.update = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await brand.update(req.body, {
      where:{
        id:id
      }
    });
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    res.status(500).json({
      status:'ok',
      data:err
    });
  }
}

self.delete = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await brand.destroy({
      where:{
        id:id
      }
    });
    return res.json({
      status:'0k',
      data:data
    });
  }catch(err){
    return res.json({
      status:'error',
      data:err
    });
  }
}

module.exports = self;