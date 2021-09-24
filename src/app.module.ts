import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { WebdataModule } from './webdata/webdata.module';

@Module({
  imports: [
    WebdataModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
