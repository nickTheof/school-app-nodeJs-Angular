const express = require("express");
const teacherController = require("../controllers/teacher.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const validateQuery = require("../middlewares/validateQuery.middleware");
const {
  teacherSchema,
  partialTeacherSchema,
} = require("../validators/teacher.schema");
const filterQuerySchema = require("../validators/filterQuery.schema");
const { paginationQuerySchema } = require("../validators/pagination.schema");

const router = express.Router();

router.use(authMiddleware.verifyToken);
// Authenticated + open-access
router.get("/", teacherController.getAllTeachers);
router.get(
  "/filtered",
  validateQuery(filterQuerySchema),
  teacherController.getAllFilteredTeachers
);

router.get(
  "/paginated",
  validateQuery(paginationQuerySchema),
  teacherController.getAllTeachersPaginated
);
router.get("/:uuid", teacherController.getTeacherByUuid);

// Admin-only by ID
router.get(
  "/id/:id",
  authMiddleware.verifyRoles("ADMIN"),
  teacherController.getTeacherById
);

// Creation
router.post(
  "/",
  validate(teacherSchema),
  authMiddleware.verifyRoles("ADMIN", "EDITOR"),
  teacherController.createTeacher
);

// Update/delete by UUID
router
  .route("/:uuid")
  .all(authMiddleware.verifyRoles("ADMIN", "EDITOR"))
  .patch(validate(partialTeacherSchema), teacherController.updateTeacherByUuid)
  .delete(teacherController.deleteTeacherByUuid);

// Update/delete by ID - Admin-only
router
  .route("/id/:id")
  .patch(
    authMiddleware.verifyRoles("ADMIN"),
    validate(partialTeacherSchema),
    teacherController.updateTeacherById
  )
  .delete(
    authMiddleware.verifyRoles("ADMIN"),
    teacherController.deleteTeacherById
  );
module.exports = router;
