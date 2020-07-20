const axios = require('axios');

require('./config.js').configure();

class SamClient {
  constructor(apiUrl) {
    this.url = apiUrl;
  }

  static checkActivityID(activityID) {
    const regex = new RegExp(/([0-9a-f]){23}\w+/);
    if (activityID
      && typeof activityID === 'string'
      && regex.test(activityID)
    ) {
      return true;
    }
    return false;
  }

  static checkActivityDetails(activityDetails) {

  }

  async getActivities() {
    const response = await axios.get(`${this.url}/activities`);
    return response.data.activities;
  }

  async getActivity(activityID) {
    const response = await axios.get(`${this.url}/activities/${activityID}`);
    if (response.status === 200) {
      return response.data.activity;
    }
    return false;
  }

  async createActivity(activityDetails) {
    const response = await axios.post(
      `${this.url}/activities`,
      { activity: activityDetails }
    );
    if (response.status === 201) {
      return true;
    }
    return false;
  }

  async modifyActivity(activityID, activityDetails) {
    const response = await axios.put(
      `${this.url}/activities/${activityID}`,
      { activity: activityDetails }
    );
    if (response.status === 204) {
      return true;
    }
    return false;
  }

  async deleteActivity(activityID) {
    const response = await axios.delete(
      `${this.url}/activities/${activityID}`
    );
    if (response.status === 204) {
      return true;
    }
    return false;
  }
}
module.exports = SamClient;
