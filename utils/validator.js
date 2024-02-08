import joi from "joi";

export const cityCreateValidator = joi.object({
    name: joi.string().alphanum().min(3).max(25).trim(true).required(),
    population: joi.number().integer().required(),
    latitude: joi.number().required(),
    longitude: joi.number().required(),
    allied_cities: joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)
});

export const cityUpdateValidator = joi.object({
    name: joi.string().alphanum().min(3).max(25).trim(true),
    population: joi.number().integer(),
    latitude: joi.number(),
    longitude: joi.number(),
    allied_cities: joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)
});