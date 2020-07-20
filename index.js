const axios = require('axios');

require('./config.js').configure();

class SamClient {
  constructor(apiUrl) {
    this.url = apiUrl;
  }

  static checkDetails(activityDetails) {

  }

  static responseCodeToMessage(responseCode) {
    switch (responseCode) {
      default: return 'Unknown code';
      case 200: return 'Activities were downloaded';
      case 201: return 'Activity was created';
      case 204: return 'Operation was finished';
      case 400: return 'Missing or bad request arguments';
      case 404: return 'No activity with specified ID';
      case 500: return 'Server error has occurred';
    }
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
