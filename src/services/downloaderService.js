import BaseAPIService from "./baseAPIService";

export default class DownloaderService extends BaseAPIService {
  static getDownloaderStatus = async () =>
    this.directRequest(`http://localhost:34034/?cmd=updateprogress`, "GET");

  static submitSimPreview = async (schemeID, isCustomNumber, payload) =>
    this.directRequest(
      `http://localhost:34034/?cmd=updatescheme&cid=${schemeID}&num=${isCustomNumber}`,
      "POST",
      payload,
      0,
      "multipart/form-data"
    );
}
