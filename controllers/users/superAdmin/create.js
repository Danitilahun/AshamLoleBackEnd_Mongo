const Superadmin = require("../../../models/user/superadminSchema");

// Create a new superadmin
const createSuperadmin = async (req, res) => {
  try {
    const data = req.body;

    const newSuperadmin = new Superadmin(data);

    const savedSuperadmin = await newSuperadmin.save();
    res.status(201).json(savedSuperadmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createSuperadmin;
