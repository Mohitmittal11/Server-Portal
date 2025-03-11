export const appRoutes = {
  admin: {
    adminLogin: "/admin/login",
    adminSignup: "/admin/auth/addAdmin",
    registerUser: "/admin/user/signup",
    list: "/admin/user",
    details: "/admin/user/list/67ada30c46b44ef9755be4be",
    delete: "/admin/user/delete/67ada30146b44ef9755be4bc",
    changeStatus:
      "/admin/user/update_status/67ada30c46b44ef9755be4be?status=true",
    edit: "/admin/user/edit",
  },
  user: {
    userLogin: "/user/login",
    resetPass: "/user/reset-password",
  },
};
