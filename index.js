const axios = require('axios');

require('./config.js').configure();

class SamClient {
  constructor(apiUrl) {
    this.url = apiUrl;
  }

  async getActivities() {
    const response = await axios.get(`${this.url}/activities`);
    return response.data.activities;
  }

  async getActivity(activityID) {
    const response = await axios.get(`${this.url}/activities/${activityID}`);
    return response.data.activity;
  }

  async createActivity(activityDetails) {
    const response = await axios.post(
      `${this.url}/activities`,
      { activity: activityDetails }
    );
    if (response) {
      return true;
    }
    return false;
  }

  async modifyActivity(activityID, activityDetails) {
    const response = await axios.put(
      `${this.url}/activities/${activityID}`,
      { activity: activityDetails }
    );
    if (response) {
      return true;
    }
    return false;
  }

  async deleteActivity(activityID) {
    const response = await axios.delete(
      `${this.url}/activities/${activityID}`
    );
    if (response) {
      return true;
    }
    return false;
  }
}
module.exports = SamClient;
