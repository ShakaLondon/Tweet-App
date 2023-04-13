import { Schema } from "mongoose";
import { IJSONConverterObject, JSONConverterObjectTypes } from "../../types/schema-types.js";

export default function JSONConverter( mongooseSchema:JSONConverterObjectTypes ) {
        const basicJSON: IJSONConverterObject = {
            type: 'object',
            title: 'users-value',
            properties: {},
            required: [],
            additionalProperties: true
        }

        for (const schemaKey in mongooseSchema.paths) {
            switch (mongooseSchema.paths[schemaKey].instance) {

                case "Array":
                    Object.assign(basicJSON.properties, {
                        [schemaKey]: {
                            type: ['array', 'null'],
                            items: {
                                type: ['string', 'null']
                              }
                        }
                    })
                    break;
                case "Date":
                    Object.assign(basicJSON.properties, {
                        [schemaKey]: {
                            type: Schema.Types.Date,
                            items: {
                                    type: ['array', 'null']
                                  }
                        }
                    })
                        break;
                case "ObjectId":
                    break;
            
                default:
                    Object.assign(basicJSON.properties, {
                        [schemaKey]: {
                            type: mongooseSchema.paths[schemaKey].instance.toLowerCase(),
                        }
                    })
                    break;
            }

            if ( mongooseSchema.paths[schemaKey].isRequired ) {
                basicJSON.required.push(schemaKey)
            }
        }

        const JSONObject = {
            // 'definitions': {
            //     ['tweet-app:schema.Users']: {
                    ...basicJSON
            //     }
            // },
            // '$ref': '#/definitions/tweet-app:schema.Users'
        }

        console.log(JSONObject, "object JSON")

        return JSON.stringify(JSONObject)

        // return JSONObject
}
