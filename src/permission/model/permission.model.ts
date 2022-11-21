import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { PermissionRole } from './permission-role.model';
import { PermissionCount } from './permission-count.output';

@ObjectType()
export class Permission {
  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  shortname!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => [PermissionRole], { nullable: true })
  PermissionRole?: Array<PermissionRole>;

  @Field(() => PermissionCount, { nullable: false })
  _count?: PermissionCount;
}
