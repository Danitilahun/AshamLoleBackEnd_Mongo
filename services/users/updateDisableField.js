const updateDisableField = async (session, userId, model, disable) => {
  try {
    const updatedUser = await model.findOneAndUpdate(
      { _id: userId },
      { disable: disable }, // Change this to false if you want to enable the user
      { new: true, session }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error in updating disable field:", error);
    throw error;
  }
};

module.exports = updateDisableField;
