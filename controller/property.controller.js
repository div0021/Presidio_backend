import PropertyModel from "../models/property.model.js";

export async function createPropertyHandler(req,res){
    const {name,image,place,area,price,bathroom,bedroom,hospital,college,pet,description} = req.body;

    const userId = res.locals.userId;

    if(!image || !name || !place || !bedroom || !bathroom || !description || !area || !price){
        return res.sendstatus(400);
      }

      try{
      const property = await PropertyModel.create({user:userId,area,bathroom,bedroom,college,description,hospital,image,name,pet,place,price});

      return res.sendStatus(200);

      }catch(error){
        console.log("[PROPERYCREATEERROR]",error);
        return res.sendstatus(500);
      }
}


export async function getAllPropertiesHandler(req,res){
    try{
        const properties = await PropertyModel.find({}).populate("user");


        return res.send(properties);

    }catch(error){
        console.log("[GETALLPROPERTIES]",error);
        return res.sendStatus(500);
    }
}

export async function getPropertyById(req,res){
    const {id} = req.params;

    try{
        const property = await PropertyModel.findOne({_id:id}).lean();

        if(!property){
            return res.sendStatus(404);
        }
        return res.send(property);

    }catch(error){
        console.log("[GETPROPERTYBYID]",error);
        return res.sendStatus(500);
    }
}