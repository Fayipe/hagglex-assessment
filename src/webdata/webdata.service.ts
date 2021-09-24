import { WebData } from './webdata.model';
import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
import cheerio from 'cheerio';
import probe from 'probe-image-size';

@Injectable()
export class WebdataService {
  constructor(@Inject(CACHE_MANAGER) private cacheStore: Cache) {}

  async getUrlMetadata(url: string): Promise<WebData> {

    try {
      // check if url is parsed or not
      if (!this.validateUrl(url)) {
        throw new Error("No url parsed.");
      }
      // check for data in cache
      const urlDataCached = await this.getUrlDataCached(url);
      if (urlDataCached) {
        return urlDataCached;
      }

      // Crawl the page and get the data out
      let res = await axios.get(url);
      let data = res.data;
      const metaData = cheerio.load(data);
      const title = "" + metaData('head > title').text();
      const description = metaData("head [name='description']").attr('content');
      const largestImage = await this.getLargestImage(metaData("a").find("img"), metaData);
      const result: any = { title, description, largestImage };

      // set data to cache
      await this.setCacheData(url, result);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // this validate the url before getting metadata
  validateUrl(url: string): boolean {
    return new URL(url) ? true : false;
  }

  // Check and get url data cached.
  async getUrlDataCached(url: string): Promise<any> {
    const data: string = await this.cacheStore.get(url);
    return data ? JSON.parse(data) : '';
  }

  // this get the largest image from the meta data
  async getLargestImage(images: any, metaData) {
    let largestImage: any = {};
    let maxDimension = 0
    for (let i = 0; i < images.length; i++) {
      const result = await probe(metaData(images[i]).attr('src'));
      let currDimension = await result.width * result.height;
      if (currDimension > maxDimension)
        maxDimension = currDimension;
      largestImage = metaData(images[i]).attr('src');
    }

    return largestImage;
  }
  // set the result into cache for 2 minutes using url as key set
  async setCacheData(url: string, data: any): Promise<void> {
    await this.cacheStore.set(url, JSON.stringify(data), { ttl: 120 });
  }
}
