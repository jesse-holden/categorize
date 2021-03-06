const ValidationError = require("./ValidationError");

module.exports = (array, categories) => {
  if (!array) {
    throw new ValidationError("array is required");
  }
  if (!Array.isArray(array)) {
    throw new ValidationError("array must be an array");
  }
  if (!categories) {
    throw new ValidationError("categories are required");
  }
  if (!Array.isArray(categories)) {
    throw new ValidationError("categories must be an array");
  }
  const uniqueCategoryNames = new Set();
  categories.forEach(({ name, filter }, index) => {
    if (name === undefined) {
      throw new ValidationError(
        `categories[${index}].name is a required field`
      );
    }
    if (name === "") {
      throw new ValidationError(
        `categories[${index}].name must be at least 1 characters`
      );
    }
    if (!filter) {
      throw new ValidationError(
        `categories[${index}].filter is a required field`
      );
    }
    if (!(filter instanceof Function)) {
      throw new ValidationError(
        `categories[${index}].filter must be a function`
      );
    }
    uniqueCategoryNames.add(name);
  });
  if (uniqueCategoryNames.size !== categories.length) {
    throw new ValidationError("categories must have unique names");
  }
  return true;
};
