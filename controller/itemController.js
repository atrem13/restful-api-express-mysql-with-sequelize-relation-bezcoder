const {
  item,
  brand,
  Sequelize
 } = require("./../models/index.js");

const Op = Sequelize.Op;

let self = {};

self.getAll = async (req,res) => {
  try{
    let data = await item.findAll({
      include:[{
        model:brand,
        as:'brand'
        }]
    });
    return res.json({
      status:"ok",
      data:data
    });
  }catch(err){
    res.status(500).json({
      status:"error",
      data:err
    });
  }
}

self.get = async (req,res) => {
  try{
    let id = req.params.id;
    let data = await item.findOne({
      include:[
        'brand'
      ],
      where:{
        id:id
      }
    });
    return res.json({
      status:"ok",
      data:data
    });
  }catch(err){
    res.status(500).json({
      status:"error",
      data:err
    });
  }
}

self.search = async (req,res) => {
  try{
    let text = req.query.text;
    let data = await item.findAll({
        include:[{
        model:brand,
        as:'brand'
      }],
      where:{
        [Op.or]:{
          name:{
            [Op.like]:`%${text}%`
          },
          //search by name of brands
          '$brand.name$':{
            [Op.like]:`%${text}%`
          }
        }
    }
    });
    return res.json({
      status:"ok",
      data:data
    });
  }catch(err){
    res.status(500).json({
      status:"error",
      data:err
    });
  }
}

self.save = async (req,res) => {
  try{
    let body = req.body;
    let data = await item.create(body);
    return res.json({
      status:"ok",
      data:data
    });
  }catch(err){
    res.status(500).json({
      status:"error",
      data:err
    });
  }
}

self.update = async (req,res) => {
  try{
  let id = req.params.id;
  let data = await item.update(req.body,{
      where:{
        id:id
      }
    });
  return res.json({
    status:"ok",
    data:data
  });
  }catch(err){
    res.status(500).json({
      status:"error",
      data:err
    });
  }
}
self.delete = async (req,res) => {
  try{
    let id = req.params.id;
    let data = await item.destroy({
        where:{
          id:id
        }
    });
    return res.json({
      status:"ok",
      data:data
    });
  }catch(err){
    res.status(500).json({
      status:"error",
      data:err
    });
  }
}

module.exports = self;