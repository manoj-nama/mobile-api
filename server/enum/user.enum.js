'use strict';

exports.roles = {
   ADMIN: "ADMIN",
   USER: "USER"
};
exports.roleList = ["USER", "ADMIN"];
exports.projections = {
   defaults: {
      _id: 1,
      name: 1,
      profileImage: 1,
      enabled: 1,
      role: 1,
      dateCreated: 1,
      email: 1
   }
};
