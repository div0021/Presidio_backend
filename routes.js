import { Router } from "express";
import { createUser,getCurrentUser,loginUser, logoutHandler } from "./controller/user.controller.js";
import requireUser from "./middleware/requireUser.js";
import { createPropertyHandler, getAllPropertiesHandler, getPropertyById } from "./controller/property.controller.js";

 const router = Router();

// Signup 
router.post("/signup",createUser);
// login 
router.post("/login",loginUser);
// get user
router.get("/me",requireUser,getCurrentUser);
// logout
router.get("/logout",requireUser,logoutHandler);

// property
// add
router.post("/addproperty",requireUser,createPropertyHandler);
// get all properties;
router.get("/allProperties",getAllPropertiesHandler);

// get by id
router.get("/propertybyid/:id",getPropertyById);


export default router;