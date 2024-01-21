const Joi = require("joi");

const validateSuperadmin = (req, res, next) => {
  const schema = Joi.object({
    bankAccount: Joi.string()
      .required()
      .min(3)
      .max(255)
      .error((errors) => {
        const requiredError = errors.find((err) => err.type === "any.required");
        const lengthError = errors.find(
          (err) => err.type === "string.min" || err.type === "string.max"
        );

        if (requiredError) {
          return new Error("Bank Account is required.");
        }

        if (lengthError) {
          return new Error(
            "Bank Account must be between 3 and 255 characters."
          );
        }

        return new Error("Invalid Bank Account.");
      }),
    email: Joi.string()
      .required()
      .email()
      .error(() => new Error("Invalid Email Address.")),
    fullAddress: Joi.string()
      .required()
      .min(3)
      .max(255)
      .error((errors) => {
        const requiredError = errors.find((err) => err.type === "any.required");
        const lengthError = errors.find(
          (err) => err.type === "string.min" || err.type === "string.max"
        );

        if (requiredError) {
          return new Error("Full Address is required.");
        }

        if (lengthError) {
          return new Error(
            "Full Address must be between 3 and 255 characters."
          );
        }

        return new Error("Invalid Full Address.");
      }),
    fullName: Joi.string()
      .required()
      .min(3)
      .max(255)
      .error((errors) => {
        const requiredError = errors.find((err) => err.type === "any.required");
        const lengthError = errors.find(
          (err) => err.type === "string.min" || err.type === "string.max"
        );

        if (requiredError) {
          return new Error("Full Name is required.");
        }

        if (lengthError) {
          return new Error("Full Name must be between 3 and 255 characters.");
        }

        return new Error("Invalid Full Name.");
      }),
    phone: Joi.string()
      .required()
      .min(3)
      .max(20)
      .error((errors) => {
        const requiredError = errors.find((err) => err.type === "any.required");
        const lengthError = errors.find(
          (err) => err.type === "string.min" || err.type === "string.max"
        );

        if (requiredError) {
          return new Error("Phone is required.");
        }

        if (lengthError) {
          return new Error("Phone must be between 3 and 20 characters.");
        }

        return new Error("Invalid Phone.");
      }),
    profileImage: Joi.string()
      .required()
      .uri()
      .error(() => new Error("Invalid Profile Image URL.")),
    securityAddress: Joi.string()
      .required()
      .min(3)
      .max(255)
      .error((errors) => {
        const requiredError = errors.find((err) => err.type === "any.required");
        const lengthError = errors.find(
          (err) => err.type === "string.min" || err.type === "string.max"
        );

        if (requiredError) {
          return new Error("Security Address is required.");
        }

        if (lengthError) {
          return new Error(
            "Security Address must be between 3 and 255 characters."
          );
        }

        return new Error("Invalid Security Address.");
      }),
    securityName: Joi.string()
      .required()
      .min(3)
      .max(255)
      .error((errors) => {
        const requiredError = errors.find((err) => err.type === "any.required");
        const lengthError = errors.find(
          (err) => err.type === "string.min" || err.type === "string.max"
        );

        if (requiredError) {
          return new Error("Security Name is required.");
        }

        if (lengthError) {
          return new Error(
            "Security Name must be between 3 and 255 characters."
          );
        }

        return new Error("Invalid Security Name.");
      }),
    securityPhone: Joi.string()
      .required()
      .min(3)
      .max(20)
      .error((errors) => {
        const requiredError = errors.find((err) => err.type === "any.required");
        const lengthError = errors.find(
          (err) => err.type === "string.min" || err.type === "string.max"
        );

        if (requiredError) {
          return new Error("Security Phone is required.");
        }

        if (lengthError) {
          return new Error(
            "Security Phone must be between 3 and 20 characters."
          );
        }

        return new Error("Invalid Security Phone.");
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

module.exports = validateSuperadmin;
