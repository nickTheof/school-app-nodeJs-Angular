const express = require("express");
const studentController = require("../controllers/student.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const validateQuery = require("../middlewares/validateQuery.middleware");
const {
  studentSchema,
  partialStudentSchema,
} = require("../validators/student.schema");

const filterQuerySchema = require("../validators/filterQuery.schema");
const { paginationQuerySchema } = require("../validators/pagination.schema");

const router = express.Router();

router.use(authMiddleware.verifyToken);
// Authenticated + open-access
router.get("/", studentController.getAllStudents);
router.get(
  "/filtered",
  validateQuery(filterQuerySchema),
  studentController.getAllFilteredStudents
);

router.get(
  "/paginated",
  validateQuery(paginationQuerySchema),
  studentController.getAllStudentsPaginated
);
router.get("/:uuid", studentController.getStudentByUuid);

// Admin-only by ID
router.get(
  "/id/:id",
  authMiddleware.verifyRoles("ADMIN"),
  studentController.getStudentById
);

// Creation
router.post(
  "/",
  authMiddleware.verifyRoles("ADMIN", "EDITOR"),
  validate(studentSchema),
  studentController.createStudent
);

// Update/delete by UUID
router
  .route("/:uuid")
  .all(authMiddleware.verifyRoles("ADMIN", "EDITOR"))
  .patch(validate(partialStudentSchema), studentController.updateStudentByUuid)
  .delete(studentController.deleteStudentByUuid);

// Update/delete by ID - Admin-only
router
  .route("/id/:id")
  .patch(
    authMiddleware.verifyRoles("ADMIN"),
    validate(partialStudentSchema),
    studentController.updateStudentById
  )
  .delete(
    authMiddleware.verifyRoles("ADMIN"),
    studentController.deleteStudentById
  );
module.exports = router;
