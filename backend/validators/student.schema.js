const { personBaseSchema, partialPersonSchema } = require("./person.schema");

const studentSchema = personBaseSchema;
const partialStudentSchema = partialPersonSchema;

module.exports = {
  studentSchema,
  partialStudentSchema,
};
