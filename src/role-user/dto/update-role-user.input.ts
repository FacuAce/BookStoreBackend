import { RoleUserUncheckedCreateInput } from '../model/role-user-unchecked-create.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleUserInput extends OmitType(
  PartialType(RoleUserUncheckedCreateInput),
  ['dts', 'its'],
) {}
