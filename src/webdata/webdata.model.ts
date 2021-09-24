import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WebData {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  largestImage?: string;
}
