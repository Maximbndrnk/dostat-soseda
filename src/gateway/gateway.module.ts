import { Module } from '@nestjs/common';
import { GetNeighborGateway } from './gateway';

@Module({
  providers: [GetNeighborGateway],
})
export class GatewayModule {}
