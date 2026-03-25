const Validator = require("fastest-validator");
const v = new Validator();

const Schema = {
  $$strict: true, 
  name: {
    type: "string",
    min: 2,
    max: 20,
    trim: true,
    messages: { stringMin: "Name is too short", required: "Name is required" }
  },
  family: {
    type: "string",
    min: 2,
    max: 20,
    trim: true,
    messages: { stringMin: "Family is too short", required: "Family is required" }
  },
  email: {
    type: "string",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    messages: { 
      required: "Email is required",
      stringPattern: "Please provide a valid email address",
    }
  },
  password: {
    type: 'string',
    min: 8,
    max: 20,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    messages: {
      stringMin: "Password must be at least 8 characters",
      stringPattern: "Password must be stronger (1 Upper, 1 Lower, 1 Number, 1 Special)",
    }
  },
  role: {
    type: 'enum',
    values: ['user', 'admin'],
    optional: true,
  }
};

const check = v.compile(Schema);

/**
 * Validate and sanitize registration data
 */
const validateAndSanitize = (data) => {
  const result = check(data);
  // Consistent with loginValidator: return true or array of error messages
  return result === true ? true : result.map(err => err.message);
};

module.exports = validateAndSanitize;