import { body, validationResult } from "express-validator";
import UserModel from "../../services/users/schema.js";
import RoleModel from "../../services/roles/schema.js";
const userValidationRules = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const cA = new Date(year - 18, month, day).toDateString();
    return [
        //  CHECKS BODY REQUEST TO SEE IF IT FITS THE CORRECT STRUCTURE
        body("firstName")
            .exists()
            .withMessage("First name is a mandatory field!")
            .isString()
            .withMessage("First name must be a string"),
        body("lastName")
            .exists()
            .withMessage("Last name is a mandatory field!")
            .isString()
            .withMessage("Last name must be a string"),
        body("loginID")
            .exists()
            .withMessage("Username is a mandatory field!")
            .isString()
            .withMessage("Username must be a string")
            .custom(async (value) => {
            return await UserModel.findOne({ loginID: value }).then((user) => {
                if (user) {
                    return Promise.reject("Username is already in use");
                }
            });
        }),
        body("email")
            .exists()
            .withMessage("Email is a mandatory field!")
            .isEmail()
            .withMessage("Email is not a valid email address!")
            .custom(async (value) => {
            return await UserModel.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject("Email is already in use, please Login!");
                }
            });
        }),
        body("password")
            .exists()
            .withMessage("Password is a mandatory field!")
            .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 2,
            minSymbols: 1,
        })
            .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, two numbers and one symbol!"),
    ];
};
const roleValidationRules = () => {
    return [
        body("role")
            .exists()
            .withMessage("Please enter a role")
            .isString()
            .withMessage("Role must be a string")
            .custom(async (value) => {
            return await RoleModel.findOne({ role: value }).then((role) => {
                if (role) {
                    return Promise.reject("Role already exists!");
                }
            });
        }),
    ];
};
const tweetValidationRules = () => {
    return [
        body("tweet")
            .exists()
            .withMessage("Please enter some text")
            .isString()
            .withMessage("Tweet must be a string")
            .custom(async (value) => {
            const wordCount = value.split(' ');
            if (wordCount < 1 && wordCount > 140) {
                return Promise.reject("Tweet must be less than 140 words and it cannot be empty.");
            }
        }),
    ];
};
const validate = (req, res, next) => {
    // ASSIGN VARIABLE TO VALIDATION RESULT OF REQUEST
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    //   IF ERRORS ARRAY IS NOT EMPTY PUSH ARRAY OF ERRORS TO VARIABLE
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({
        [err.param]: err.msg,
    }));
    // RETURN ERRORS
    return res.status(422).json({
        errors: extractedErrors,
    });
};
const validations = {
    userValidationRules: userValidationRules,
    roleValidationRules: roleValidationRules,
    tweetValidationRules: tweetValidationRules,
    validate: validate,
};
export default validations;
