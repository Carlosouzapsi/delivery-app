const UtilsRepository = require("../repositories/utilsRepository");

class UtilsService {
  constructor() {
    this.repository = new UtilsRepository();
  }
  async clearDataService() {
    await this.repository.clearData();
  }
}

module.exports = UtilsService;
