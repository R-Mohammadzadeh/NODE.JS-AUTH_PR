const Validator = require("fastest-validator");
const v = new Validator();

const Schema = {
  $$strict: true, // Prevents additional fields not defined in the schema
  email: {
    type: 'string',
    empty: false,
    required: true,
    email: true,
    trim: true, // Automatically removes spaces from start/end
    messages: { 
      required: "Email is required",
      stringEmpty: "Email cannot be empty",
      email: "Email is not valid",
    }
  },
  password: {
    type: 'string',
    empty: false,
    required: true,
    min: 8,
    max: 20,
    messages: {
      required: "Password is required",
      stringMin: "Password must be at least 8 characters",
      stringMax: "Password must be at most 20 characters",
    }
  },
};

// Compile the schema for better performance
const validate = v.compile(Schema);

/**
 * Validate and sanitize login data
 * @param {Object} data - The req.body object
 * @returns {Boolean|Array} - Returns true if valid, or an array of error messages
 */
const validateAndSanitize = (data) => {
  const result = validate(data);
  // Return true if valid, otherwise return an array of error strings
  return result === true ? true : result.map(err => err.message);
};

module.exports = validateAndSanitize;