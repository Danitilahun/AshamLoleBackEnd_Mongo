const updateProfileImage = async (session, userId, model, newProfileImage) => {
  try {
    const updatedUser = await model.findOneAndUpdate(
      { _id: userId },
      { profileImage: newProfileImage },
      { new: true, session }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error in updating profileImage:", error);
    throw error;
  }
};

module.exports = updateProfileImage;
