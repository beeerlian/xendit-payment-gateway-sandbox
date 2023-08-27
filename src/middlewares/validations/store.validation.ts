import { body } from "express-validator";

export const create = [
  body("store_name").notEmpty().withMessage("Store name is required"),
  body("picture").notEmpty().withMessage("Store picture is required"),
  body("address").notEmpty().withMessage("Store address is required"),
  body("phone").optional(),
  body("website").optional(),
  body("id_owner").optional().toInt(),
  body("social_facebook").optional(),
  body("social_instagram").optional(),
  body("social_twitter").optional(),
  body("is_active").optional().toInt(),
  body("latitude").optional(),
  body("longitude").optional(),
  body("delivery_charge").optional().toFloat(),
];

export const update = [
  body("store_name").notEmpty().withMessage("Store name is required"),
  body("picture").notEmpty().withMessage("Store picture is required"),
  body("address").notEmpty().withMessage("Store address is required"),
  body("phone").optional(),
  body("website").optional(),
  body("id_owner").optional().toInt(),
  body("social_facebook").optional(),
  body("social_instagram").optional(),
  body("social_twitter").optional(),
  body("is_active").optional().toInt(),
  body("latitude").optional(),
  body("longitude").optional(),
  body("delivery_charge").optional().toFloat(),
];
