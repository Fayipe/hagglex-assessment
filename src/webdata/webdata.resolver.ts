import { WebData } from './webdata.model';
import { WebdataService } from './webdata.service';
import { Args, Resolver, Query } from '@nestjs/graphql';

@Resolver((of) => WebData)
export class WebdataResolver {
  constructor(private webdataService: WebdataService) {}

  @Query((returns) => WebData)
  async Webdata(@Args('url', { type: () => String }) url: string) {
    const webData = this.webdataService.getUrlMetadata(url);
    return webData;
  }
}
