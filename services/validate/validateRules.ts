export const blogRule = {
  title: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  description: {
    presence: {
      allowEmpty: true,
    },
    type: "string",
  },
  toc: {
    presence: {
      allowEmpty: true,
    },
    type: "string",
  },
  htmlContent: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  thumb: {
    presence: {
      allowEmpty: true,
    },
    type: "string",
  },

  categoryId: {
    presence: true,
    type: "integer",
    categoryIdIsExist: true,
  },
};

export const updateBlogRule = {
  id: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  ...blogRule,
};
