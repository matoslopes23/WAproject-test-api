import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/AuthController';
import { TestController } from './controllers/TestController';
import { UserController } from './controllers/UserController';
import { OrderController } from './controllers/OrderController';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { UserRepository } from './repositories/UserRepository';
import { OrderRepository } from './repositories/OrderRepository'
import { AuthService } from './services/AuthService';
import { UserService } from './services/UserService';
import { OrderService} from './services/OrderService';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, UserController, OrderController, TestController],
  providers: [AuthService, UserRepository, UserService, OrderRepository, OrderService]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
