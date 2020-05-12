import Model from "./Model.js";


export const User = {
    ...Model,
    first_name: 'string',
    last_name: 'string',
    email: 'string',
    password: 'string',
    confirm_password: 'string',
    phone: 'string',
    website: 'string',
    successMsg: 'string',
    errorMsg: 'string',
}
