import { SetMetadata } from '@nestjs/common';
import { ValidRolesInterface } from '../interfaces';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: ValidRolesInterface[]) => {


    return SetMetadata(META_ROLES, args);
};
