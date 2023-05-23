import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../routes/v1/users/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);