import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { RefrigeratorRepository } from './repositories/refrigerator.repository';
import { RefrigeratorEntity } from './entities/refrigerator.entity';

@Module({
  providers: [KitchenService, RefrigeratorRepository, RefrigeratorEntity],
  controllers: [KitchenController],
})
export class KitchenModule {}
