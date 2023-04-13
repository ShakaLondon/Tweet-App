"use strict";
// import express from "express";
// import createError from "http-errors";
// import RoleModel from "./schema.js";
// import validations from "../../utils/validation/index.js";
// import { adminOnly } from "../../utils/auth/jwt.js";
// const { roleValidationRules, validate } = validations;
// const roleRouter = express.Router();
// // ADD ROLES ✅
// roleRouter.post(
//   "/", 
//   roleValidationRules(),
//   validate,
//   // adminOnly,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { role } = req.body;
//       if (!role) {
//         return res.status(500).send( "Role not found" );
//       }
//       const createRole = await new RoleModel({ role: role }).save();
//       if ( createRole ) {
//       res.status(200).send({
//         createRole: createRole,
//       });
//       } else {
//         next(createError(404, `Unable to create role`));
//       }
//     } catch (error) {
//       next(createError(500, 'Error creating role'));
//     }
//   });
// // GET ALL ROLES ✅
// roleRouter.get(
//   "/", 
//   // adminOnly,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const getRoles = await RoleModel.find();
//       if ( getRoles && getRoles.length > 0 ) {
//         res.status(200).send({
//           getRoles,
//         });
//       } else {
//         // return res.status(404).send( `No roles found!` );
//         next(createError(404, `No roles found!`));
//       }
//     } catch (error) {
//       next(createError(500, `Error getting roles`));
//     }
//   });
// // GET ROLE BY ID ✅
// roleRouter.get(
//   "/:roleID", 
//   // adminOnly,
//   async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const roleID = req.params.roleID
//     const getRole = await RoleModel.findById(roleID);
//     console.log(getRole)
//     if ( getRole ) {
//       res.status(200).send({
//         getRole,
//       });
//     } else {
//       next(createError(404, `RoleID: ${roleID} not found!`));
//     }
//   } catch (error) {
//     next(createError(500, `Error getting role`));
//   }
// });
// // DELETE ROLE ✅
// roleRouter.delete(
//   "/:roleID", 
//   // adminOnly,
//   async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const roleID = req.params.roleID
//     const deleteRole = await RoleModel.findByIdAndDelete(roleID);
//     if ( deleteRole && deleteRole.length > 0 ) {
//       res.status(200).send(`Role ${deleteRole.role}: ${deleteRole._id} has been deleted.`);
//     } else {
//       next(createError(404, `RoleID: ${roleID} not found!`));
//     }
//   } catch (error) {
//     next(createError(500, `Error deleting role`));
//   }
// });
// export default roleRouter;
