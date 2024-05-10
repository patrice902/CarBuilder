const Base = require("../models/base.model");
const { checkSQLWhereInputValid } = require("../utils/common");

class BasePaintService {
  static async getList() {
    const bases = await Base.forge().fetchAll();
    return bases;
  }

  static async getById(id) {
    if (!checkSQLWhereInputValid(id)) {
      throw new Error("SQL Injection attack detected.");
    }

    const base = await Base.where({ id }).fetch();
    return base;
  }

  static async create(payload) {
    const base = await Base.forge(payload).save();
    return base;
  }

  static async updateById(id, payload) {
    const base = await this.getById(id);
    await base.save(payload);
    return base;
  }
}

module.exports = BasePaintService;
