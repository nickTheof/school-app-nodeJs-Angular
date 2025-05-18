const { z } = require("zod");

const filterQuerySchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

module.exports = filterQuerySchema;
