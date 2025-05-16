const { z } = require("zod");

const personBaseSchema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  vat: z.string().min(1, "VAT is required"),
  fathername: z.string().min(1, "Fathername is required"),
  phoneNum: z.string().min(1, "Phone number is required"),
  email: z.string().email("Email has not valid format"),
  zipcode: z.string().min(1, "Zipcode is required"),
  address: z.string().min(1, "Address is required"),
  streetNum: z.string().min(1, "Street number is required"),
  city: z.string().regex(/^[0-9a-fA-F]{24}$/, "City must be a valid ObjectId"),
});

const partialPersonSchema = personBaseSchema.partial();

module.exports = {
  personBaseSchema,
  partialPersonSchema,
};
