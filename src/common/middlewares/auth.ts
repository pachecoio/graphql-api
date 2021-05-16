import { AuthenticationError } from "apollo-server-errors";
import { verify } from "../auth/jwt";
import { HttpRequestError } from "../exceptions";

export const validatePermissions = (user, roles = [], permissions = []) => {
  const isAdmin = !!user.roles.find((r) => r.name === "admin");
  if (isAdmin) return;

  if (roles) {
    roles.forEach((role) => {
      const userRole = user.roles.find((r) => r.name === role);
      if (!userRole)
        throw new HttpRequestError(
          401,
          `User ${user.name} has no permissions to access this resource`
        );
    });
  }

  if (permissions) {
    const userPermissions = [
      ...user.roles.reduce((acc, value) => {
        return [...acc, ...value.permissions];
      }, []),
      ...user.permissions,
    ];
    permissions.forEach((permission) => {
      const userPermission = userPermissions.find((p) => p.name === permission);
      if (!userPermission)
        throw new HttpRequestError(
          401,
          `User ${user.name} has no permissions to access this resource`
        );
    });
  }
};

export default {
  require(roles = ["user"], permissions = []): MethodDecorator {
    return function (
      target: Object,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const original = descriptor.value;
      descriptor.value = async function (...args: any[]) {
        const [root, params, { req }] = args;
        const { valid, user, ...verified } = await verify(req.headers);
        if (!valid)
          throw new AuthenticationError(
            "You must be logged in to access this resource"
          );

        req.user = user;
        return original.apply(this, args);
      };
    };
  },
};
