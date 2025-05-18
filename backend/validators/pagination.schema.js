const { z } = require("zod");

const paginationQuerySchema = z
  .object({
    page: z
      .string()
      .optional()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !val || (val > 0 && Number.isInteger(val)), {
        message: "Page must be a positive integer",
      }),
    limit: z
      .string()
      .optional()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !val || (val > 0 && Number.isInteger(val)), {
        message: "Limit must be a positive integer",
      }),
  })
  .strict();

module.exports = { paginationQuerySchema };
