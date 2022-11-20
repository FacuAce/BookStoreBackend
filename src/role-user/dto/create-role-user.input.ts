import { RoleUserUncheckedCreateInput } from '../model/role-user-unchecked-create.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateRoleUserInput extends OmitType(
  RoleUserUncheckedCreateInput,
  ['dts', 'its'],
) {}
