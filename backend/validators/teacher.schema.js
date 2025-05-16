const { personBaseSchema, partialPersonSchema } = require("./person.schema");

const teacherSchema = personBaseSchema;
const partialTeacherSchema = partialPersonSchema;

module.exports = {
  teacherSchema,
  partialTeacherSchema,
};
