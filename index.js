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
    const name = activityDetails.name;
    const category = activityDetails.category;
    const startDate = activityDetails.start_date;
    const endDate = activityDetails.end_date;
    const distance = activityDetails.distance;

    if (
      !name || name === '' // activity name
      || !category || category === '' // activity category
      || !startDate || Number.parseInt(startDate, 10) < 0 // start date
      || !endDate || Number.parseInt(endDate, 10) < 0 // start date
      || Date.parse(startDate) >= Date.parse(endDate) // date order
      || (distance && (
        Number.isNaN(Number.parseFloat(distance))
          || distance < 0))
    ) {
      return false;
    }
    return true;
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
