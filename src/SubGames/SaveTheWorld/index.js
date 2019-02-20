const SubGame = require('../');
const ENDPOINT = require('../../../resources/Endpoint');

class SaveTheWorldSubGame extends SubGame {
  
  constructor(fn) {
    super(fn);

    this.name = 'SaveTheWorld';

    this.world = null;

    this.launcher.debug.print('More methods for Save The World will be added in future updates.');

  }

  async init() {

    await this.refreshWorldInfo();

  }

  async refreshWorldInfo() {

    try {
            
      const { data } = await this.fn.http.sendGet(
        ENDPOINT.WORLD_INFO,
        `${this.fn.auth.tokenType} ${this.fn.auth.accessToken}`,
      );

      this.world = data;

    } catch (err) {

      this.launcher.debug.print(new Error(err));

    }

  }
  
  getNews() {

    if (
      !this.fn.basicData
      || !this.fn.basicData.savetheworldnews
      || !this.fn.basicData.savetheworldnews.news
    ) return false;

    const result = {
      list: this.fn.basicData.savetheworldnews.news.messages.map(item => ({
        title: item.title,
        image: item.image,
        body: item.body,
        hidden: item.hidden,
        messageType: item.messagetype,
        adspace: item.adspace,
        spotlight: item.spotlight,
      })),
      lastModified: new Date(this.fn.basicData.savetheworldnews.lastModified),
    };

    return result;
  }

}

module.exports = SaveTheWorldSubGame;
