export const createUserValidationSchema = {
  name: {
    isLength: {
      errorMessage: "Name must be between 3-10 characters",
      options: { min: 3, max: 10 },
    },
    notEmpty: {
      errorMessage: "Name is required",
    },

    isString: {
      errorMessage: "Name must be a string",
    },
  },

  displayName: {
    notEmpty: {
      errorMessage: "Display Name is required",
    },
  },
};
