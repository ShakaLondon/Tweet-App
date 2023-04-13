import createError from "http-errors";
const { TokenExpiredError } = jwt;
import jwt from "jsonwebtoken";
import UserModel from "../../services/users/schema.js";
import RoleModel from "../../services/roles/schema.js";
export function generateJwt(payload) {
    return new Promise(function (resolve, reject) {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }, (err, token) => {
            if (err)
                reject(err);
            else
                resolve(token);
        });
    });
}
export async function JwtMiddleware(req, res, next) {
    try {
        console.log(req.headers.authorization, "header2");
        if (!req.headers.authorization) {
            next(createError(401, "Unauthorized Access!"));
        }
        else {
            const token = req.headers.authorization.replace("Bearer ", "");
            console.log(token);
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded, "decoded token");
                req.token = token;
                req.params._id = decoded.id;
                next();
            }
            catch (e) {
                if (e instanceof TokenExpiredError) {
                    next(createError(401, "Unauthorized! Access Token was expired!"));
                }
                next(createError(400));
            }
        }
    }
    catch (error) {
        next(error);
    }
}
export async function JwtUserMiddleware(req, res, next) {
    try {
        console.log(req.headers.authorization, "header");
        if (!req.headers.authorization) {
            console.log("here");
            next();
        }
        else {
            const token = req.headers.authorization.replace("Bearer ", "");
            console.log(token);
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded, "decoded token");
                req.token = token;
                req.params._id = decoded.id;
                next();
            }
            catch (e) {
                if (e instanceof TokenExpiredError) {
                    next(createError(401, "Unauthorized! Access Token was expired!"));
                }
                next(createError(400));
            }
        }
    }
    catch (error) {
        next(error);
    }
}
// export const userOnly = async (req: Request, res: Response, next: NextFunction) => {
//   const user = await UserModel.findOne({ $or: [{ username: userName }, { _id: userName }]});
//   if ( req.params.loginID === user._id ) {
//     console.log(req.user, "USER ONLY");
//     next();
//   } else {
//     next(createError(403, "Access to resource unauthorized."));
//   }
// };
export const adminOnly = (req, res, next) => {
    UserModel.findById(req.params.loginID, (err, user) => {
        if (err) {
            next(createError(403, "ADMIN Only!"));
        }
        console.log("user roles", user.role);
        RoleModel.find({
            _id: { $in: user.role }
        }, (err, roles) => {
            if (err) {
                // res.status(500).send({ message: err });
                // return;
                next(createError(500));
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].role === "ADMIN") {
                    next();
                    return;
                }
            }
            // res.status(403).send({ message: "Require Developer Role!" });
            // return;
            next(createError(403, "ADMIN Only!"));
        });
    });
};
export const developerOnly = (req, res, next) => {
    UserModel.findById(req.params.loginID, (err, user) => {
        if (err) {
            // res.status(500).send({ message: err });
            // return;
            next(createError(403, "DEVELOPER Only!"));
        }
        RoleModel.find({
            _id: { $in: user.role }
        }, (err, roles) => {
            if (err) {
                // res.status(500).send({ message: err });
                // return;
                next(createError(500));
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].role === "DEVELOPER") {
                    next();
                    return;
                }
            }
            // res.status(403).send({ message: "Require Developer Role!" });
            // return;
            next(createError(403, "DEVELOPER Only!"));
        });
    });
};
function reject(err) {
    throw new Error("Function not implemented.");
}
