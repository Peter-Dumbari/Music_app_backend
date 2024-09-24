export const createUserValidationSchema = {
  username: {
    isLength: {
      errorMessage: "Username must be between 3-10 characters",
      options: { min: 3, max: 10 },
    },
    notEmpty: {
      errorMessage: "Username is required",
    },

    isString: {
      errorMessage: "Username must be a string",
    },
  },

  displayName: {
    notEmpty: {
      errorMessage: "Display Name is required",
    },
  },

  password: {
    notEmpty: true,
  },
};
