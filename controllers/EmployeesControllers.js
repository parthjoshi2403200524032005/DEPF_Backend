const Employee = require("../models/EmployeesModel.js"); // Import the Role model
const moment = require("moment");
const mongoose = require("mongoose");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const formatDate = (date) => (date ? moment(date).format("YYYY-MM-DD") : null);

const formatEmployeeData = (employee) => {
  if (!employee) return null;

  return {
    ...employee.toObject(),
    interviewDate: formatDate(employee.interviewDate),
    offeredDate: formatDate(employee.offeredDate),
    offerAcceptanceDate: formatDate(employee.offerAcceptanceDate),
    dateOfJoining: formatDate(employee.dateOfJoining),
    personal: {
      ...employee.personal,
      dob: formatDate(employee.personal?.dob),
    },
    insuranceAndBank: {
      ...employee.insuranceAndBank,
      marriageDate: formatDate(employee.insuranceAndBank?.marriageDate),
    },
    mother: {
      ...employee.mother,
      motherDOB: formatDate(employee.mother?.motherDOB),
    },
    father: {
      ...employee.father,
      fatherDOB: formatDate(employee.father?.fatherDOB),
    },
    spouse: {
      ...employee.spouse,
      spouseDOB: formatDate(employee.spouse?.spouseDOB),
    },
    children: employee.children?.map((child) => ({
      ...child,
      childDOB: formatDate(child.childDOB),
      // childDOB: formatDate(child._doc?.childDOB),
    })),
    createdAt: formatDate(employee.createdAt),
    updatedAt: formatDate(employee.updatedAt),
  };
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Employee ID" });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(formatEmployeeData(employee));
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    console.log("Employee ID:", req.params.id);
    console.log("Request Body:", req.body);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid Employee ID" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Update data is required" });
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all controller functions
module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
