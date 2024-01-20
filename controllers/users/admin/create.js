const Admin = require("../../../models/user/adminSchema");

// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const data = req.body;
    data.salary = parseInt(data.salary);
    data.uniqueName = "admin";
    data.role = process.env.ADMIN;

    const newAdmin = new Admin(data);

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createAdmin;
