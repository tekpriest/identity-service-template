import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLE = 'role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE, roles);
