const mongoose = require("mongoose");

// Employee schema
const EmployeeSchema = new mongoose.Schema(
  {
    employeeID: { type: String, required: true, unique: true, trim: true },
    employeeName: { type: String, required: true, trim: true },
    appointedPosition: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    manager: { type: Boolean, required: true },
    workplace: { type: String, required: true, trim: true },
    project: { type: String, trim: true },
    reportingEmployeeManagerID: { type: String, trim: true },
    referredBy: { type: String, trim: true },
    interviewDate: { type: Date },
    offeredDate: { type: Date },
    offerAcceptanceDate: { type: Date },
    onRollOffRoll: {
      type: String,
      enum: ["On-Roll", "Off-Roll"],
      required: true,
    },
    appointmentLetterRefNo: { type: String, trim: true },
    dateOfJoining: { type: Date, required: true },
    status: { type: String, trim: true },
    education: {
      highestEducation: { type: String, required: true },
      yearOfPassing: { type: Number, required: true },
      relevantExperience: { type: String, required: true },
    },
    personal: {
      dob: { type: Date, required: true },
      age: { type: Number, required: true },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      bloodGroup: { type: String, required: true },
      aadharNo: { type: String, required: true, unique: true },
    },
    communication: {
      phoneNo: { type: String, required: true },
      altPhoneNo: { type: String },
      personalEmail: { type: String, required: true, unique: true },
      workEmail: { type: String },
      permanentAddress: { type: String, required: true },
      correspondentAddress: { type: String },
    },
    insuranceAndBank: {
      gpaiNo: { type: String },
      bankName: { type: String },
      bankAccountNo: { type: String },
      ifsc: { type: String },
      uan: { type: String },
      esiNo: { type: String },
      maritalStatus: {
        type: String,
        enum: ["Single", "Married", "Divorced", "Widowed"],
      },
      marriageDate: { type: Date },
    },
    mother: {
      motherName: { type: String },
      motherAadharNo: { type: String },
      motherDOB: { type: Date },
    },
    father: {
      fatherName: { type: String },
      fatherAadharNo: { type: String },
      fatherDOB: { type: Date },
    },
    spouse: {
      spouseName: { type: String },
      spouseAadharNo: { type: String },
      spouseDOB: { type: Date },
    },
    children: [
      {
        childName: { type: String },
        childAadharNo: { type: String },
        childDOB: { type: Date },
      },
    ],
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phone: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
