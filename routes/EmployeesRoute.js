const express = require("express");
const router = express.Router();
const EmployeesControllers = require("../controllers/EmployeesControllers.js");

router.get("/", EmployeesControllers.getAllEmployees);
router.get("/:id", EmployeesControllers.getEmployeeById);
router.post("/", EmployeesControllers.createEmployee);
router.put("/:id", EmployeesControllers.updateEmployee);
router.delete("/:id", EmployeesControllers.deleteEmployee);

module.exports = router;
 