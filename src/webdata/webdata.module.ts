import { Module, CacheModule } from '@nestjs/common';
import { WebdataService } from './webdata.service';
import { WebdataResolver } from './webdata.resolver';

@Module({
  imports: [CacheModule.register()],
  providers: [WebdataService, WebdataResolver],
})
export class WebdataModule {}
