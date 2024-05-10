const { LayerTypes } = require("../constants");
const Layer = require("../models/layer.model");
const {
  getLayerUpdatingInfo,
  checkSQLWhereInputValid,
} = require("../utils/common");

class LayerService {
  static async getList() {
    const layers = await Layer.forge().fetchAll();
    return layers;
  }

  static async getById(id) {
    if (!checkSQLWhereInputValid(id)) {
      throw new Error("SQL Injection attack detected.");
    }

    const layer = await Layer.where({ id }).fetch();
    return layer;
  }

  static async getListByUploadID(uploadID) {
    if (!checkSQLWhereInputValid(uploadID)) {
      throw new Error("SQL Injection attack detected.");
    }

    const layers = await Layer.where({
      layer_type: LayerTypes.UPLOAD,
      upload_id: uploadID,
    }).fetchAll({
      withRelated: ["scheme"],
    });
    return layers;
  }

  static async getListByMultiUploadIDs(uploadIDs) {
    if (!uploadIDs || !Array.isArray(uploadIDs) || !uploadIDs.length) {
      throw new Error("Invalid input.");
    }

    for (let id of uploadIDs) {
      if (!checkSQLWhereInputValid(id)) {
        throw new Error("SQL Injection attack detected.");
      }
    }

    const layers = await Layer.query((qb) =>
      qb
        .where({
          layer_type: LayerTypes.UPLOAD,
        })
        .andWhere("upload_id", "IN", uploadIDs)
    ).fetchAll({
      withRelated: ["scheme"],
    });
    return layers;
  }

  static async create(payload) {
    if (!checkSQLWhereInputValid(payload.scheme_id)) {
      throw new Error("SQL Injection attack detected.");
    }

    let scheme_layers = await Layer.where({
      scheme_id: payload.scheme_id,
    }).fetchAll();
    scheme_layers = scheme_layers.toJSON();
    let layer_data = JSON.parse(payload.layer_data);
    let layerName = layer_data.name;
    let number = 0;

    for (let layerItem of scheme_layers) {
      let item_layer_data = layerItem.layer_data
        ? JSON.parse(layerItem.layer_data)
        : null;
      if (item_layer_data && item_layer_data.name.indexOf(layerName) === 0) {
        const extraSpace = item_layer_data.name.substr(layerName.length);
        if (!isNaN(extraSpace)) {
          number = extraSpace === "" ? 1 : parseInt(extraSpace) + 1;
        }
      }
    }
    if (number) layerName = `${layerName} ${number}`;
    layer_data.name = layerName;
    const layer = await Layer.forge({
      ...payload,
      layer_data: JSON.stringify(layer_data),
    }).save(null, { method: "insert" });
    return layer;
  }

  static async updateById(id, payload) {
    const layer = await this.getById(id);
    const layerInfo = layer.toJSON();

    await layer.save(getLayerUpdatingInfo(layerInfo, payload), { patch: true });
    return layer;
  }

  static async bulkUpdate(payload) {
    const list = [];
    let promises = [];

    for (let item of payload) {
      promises.push(
        // eslint-disable-next-line no-async-promise-executor
        new Promise(async (resolve) => {
          try {
            const layer = await this.getById(item.id);
            const layerInfo = layer.toJSON();

            await layer.save(getLayerUpdatingInfo(layerInfo, item), {
              patch: true,
            });
            list.push(layer);
          } catch (error) {
            console.log(error);
          }

          resolve();
        })
      );
    }
    await Promise.all(promises);

    return list;
  }

  static async deleteById(id) {
    if (!checkSQLWhereInputValid(id)) {
      throw new Error("SQL Injection attack detected.");
    }

    await Layer.where({ id }).destroy({ require: false });
    return true;
  }

  static async deleteByMultiId(ids) {
    if (!ids || !Array.isArray(ids) || !ids.length) {
      throw new Error("Invalid input.");
    }

    for (let id of ids) {
      if (!checkSQLWhereInputValid(id)) {
        throw new Error("SQL Injection attack detected.");
      }
    }

    await Layer.where("id", "IN", ids).destroy({ require: false });
    return true;
  }

  static async deleteByUploadID(uploadID) {
    if (!checkSQLWhereInputValid(uploadID)) {
      throw new Error("SQL Injection attack detected.");
    }

    await Layer.where({
      layer_type: LayerTypes.UPLOAD,
      upload_id: uploadID,
    }).destroy({ require: false });
    return true;
  }

  static async deleteByUploadIDAndScheme(uploadID, schemeIDs) {
    if (!checkSQLWhereInputValid(uploadID)) {
      throw new Error("SQL Injection attack detected.");
    }

    if (!schemeIDs || !Array.isArray(schemeIDs) || !schemeIDs.length) {
      throw new Error("Invalid input.");
    }

    for (let id of schemeIDs) {
      if (!checkSQLWhereInputValid(id)) {
        throw new Error("SQL Injection attack detected.");
      }
    }

    await Layer.query((qb) =>
      qb
        .where({
          layer_type: LayerTypes.UPLOAD,
          upload_id: uploadID,
        })
        .andWhere("scheme_id", "IN", schemeIDs)
    ).destroy({ require: false });
    return true;
  }

  static async deleteByMultiUploadIDs(uploadIDs) {
    if (!uploadIDs || !Array.isArray(uploadIDs) || !uploadIDs.length) {
      throw new Error("Invalid input.");
    }

    for (let id of uploadIDs) {
      if (!checkSQLWhereInputValid(id)) {
        throw new Error("SQL Injection attack detected.");
      }
    }

    await Layer.query((qb) =>
      qb
        .where({
          layer_type: LayerTypes.UPLOAD,
        })
        .andWhere("upload_id", "IN", uploadIDs)
    ).destroy({ require: false });
    return true;
  }

  static async deleteAllBySchemeId(scheme_id) {
    if (!checkSQLWhereInputValid(scheme_id)) {
      throw new Error("SQL Injection attack detected.");
    }

    await Layer.where({
      scheme_id,
    }).destroy({ require: false });
    return true;
  }

  static async deleteByQuery(query) {
    await Layer.where(query).destroy({ require: false });
    return true;
  }
}

module.exports = LayerService;
