const axios = require('axios');

require('./config.js').configure();

class SamClient {
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

  }

  async getActivity(activityID) {

  }

  async createActivity(activityDetails) {

  }

  async modifyActivity(activityID, activityDetails) {

  }

  async deleteActivity(activityID) {

  }
}
module.exports = SamClient;
