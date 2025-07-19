import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './infrastructure/modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TokenGuard } from '@infrastructure/guard/token.guard';
import jwtConfig from '@infrastructure/config/jwt.config';
import { CartModule } from '@infrastructure/modules/cart.module';
import { ProductModule } from '@infrastructure/modules/product.module';
import { FavoritesModule } from '@infrastructure/modules/favorites.module';
import { ProductCategoryModule } from '@infrastructure/modules/product-category.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [jwtConfig],
    }),
    MongooseModule.forRoot(
      // 'mongodb://localhost:27017/eco',
      `mongodb+srv://isaackamel12345:udPwNuoprylQXdxc@node.ttbzwaa.mongodb.net/eco?retryWrites=true&w=majority&appName=node`,
    ),
    UserModule,
    CartModule,
    ProductModule,
    ProductCategoryModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: TokenGuard }],
})
export class AppModule {}
