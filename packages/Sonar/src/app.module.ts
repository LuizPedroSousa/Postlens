import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { UserModule } from "@modules/users/index.module";

const prisma = new PrismaClient({
  log: ["query"],
});

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,

      autoSchemaFile: join(process.cwd(), "src/schema.graphql"),
    }),
  ],
})
export class AppModule {}
