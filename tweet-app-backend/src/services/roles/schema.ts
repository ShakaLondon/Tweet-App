import mongoose from "mongoose"
import { IRole, IRoleModel } from "../../types/schema-types.js";

const { Schema, model } = mongoose

const RoleSchema = new Schema<IRole, IRoleModel>(
  {
    role: {
      type: String,
      required: true,
      enum : ['USER','ADMIN', 'DEVELOP'],
      default: 'USER'
    },
  }
)

RoleSchema.static('findRoles', async function findRoles(rolesArray: Array<string>) {
  console.log(rolesArray);

  const roleDocument:IRoleModel = this;

  const roles = await roleDocument.find({
    role: { $in: rolesArray }
  });

  const roleOutput = roles.map(role => role._id);


  console.log(roleOutput, "roles out");

    if (roleOutput) {
      return roleOutput;
    } else {
      return null;
    }
});

export default model<IRole, IRoleModel>("Role", RoleSchema)