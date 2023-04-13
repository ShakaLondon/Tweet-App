import mongoose from "mongoose";
const { Schema, model } = mongoose;
const RoleSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['USER', 'ADMIN', 'DEVELOP'],
        default: 'USER'
    },
});
RoleSchema.static('findRoles', async function findRoles(rolesArray) {
    console.log(rolesArray);
    const roleDocument = this;
    const roles = await roleDocument.find({
        role: { $in: rolesArray }
    });
    const roleOutput = roles.map(role => role._id);
    console.log(roleOutput, "roles out");
    if (roleOutput) {
        return roleOutput;
    }
    else {
        return null;
    }
});
export default model("Role", RoleSchema);
