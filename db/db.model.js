import { v4 as uuidV4 } from "uuid";
import { dataToJson, writeJSONFile } from "../helpers";

const mockedProducts = `${__dirname}/../mocks/mocked_products.json`;

export class DbHelper {
  data = [];
  constructor(fileData) {
    this.data = dataToJson(fileData);
    this.fileData = fileData;
  }

  /**
   *
   * @param {*} conditions COnditions to be checking
   * @returns Records match the conditions
   */
  findAll(conditions = {}) {
    return this.data.filter(conditions);
  }

  /**
   *
   * @param {*} id Record Id
   * @returns One record
   */
  findById(id = "") {
    return this.data.find((item) => (item.id = id));
  }

  /**
   *
   * @param {*} info Info to be saved
   * @returns The new created data
   */
  create(info = {}) {
    const id = { id: uuidV4() };
    const date = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newRecord = { ...id, ...info, ...date };
    this.data.push(newRecord);
    writeJSONFile(this.fileData, this.data);

    return newRecord;
  }

  /**
   *
   * @param {*} info update data
   * @param {*} id Id to be updated
   * @returns New updated data
   */
  update(info = {}, id) {
    const recordIndex = this.data.findIndex((record) => record.id === id);
    for (const key in info) {
      this.data[recordIndex][key] = info[key];
    }
    this.data[recordIndex]["updatedAt"] = new Date();
    writeJSONFile(this.fileData, this.data);

    return this.data[recordIndex];
  }
}
