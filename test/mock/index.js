// Axios mock
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mockedAxios = new MockAdapter(axios);

const config = require('../config.json');
const examples = require('./examples.json');

const mockedData = [];

const mockRequests = () => {
  // reset the mock and the mock the requests again
  mockedAxios.reset();

  // all activities
  mockedAxios
    .onGet(`${config.api_url}/activities`)
    .reply(200, { activities: mockedData });

  // add an activity
  examples.forEach(example => {
    mockedAxios
      .onPost(
        `${config.api_url}/activities`,
        { activity: example }
      )
      .reply(201);
  });
  mockedAxios
    .onPost('/activities')
    .reply(201);

  mockedData.forEach(item => {
    // get activity
    mockedAxios
      .onGet(`/activities/${item['_id']}`)
      .reply(200, { activity: item });
    // modify activity
    mockedAxios
      .onPut(`/activities/${item['_id']}`)
      .body({
        activity: {
          name: `${item.name} (modified)`,
          category: item.name,
          start_date: item.start_date,
          end_date: item.end_date
        }
      })
      .reply(204);
    // delete activity
    mockedAxios
      .onDelete(`/activities/${item['_id']}`)
      .reply(204);
  });
};

const findActivityIndex = activity => mockedData.findIndex(a => a['_id'] === activity['_id']);
const findActivityIndexByID = activity => mockedData.findIndex(a => a['_id'] === activity['_id']);

const getActivities = () => mockedData;
const getActivity = activityID => mockedData.find(a => a['_id'] === activityID);
const addActivity = activity => mockedData.push(activity);
const modifyActivity = activity => {
  mockedData[findActivityIndex(activity)] = activity;
};
const deleteActivity = activityID => mockedData.splice(findActivityIndexByID(activityID), 1);

module.exports = {
  findActivityIndex,
  findActivityIndexByID,
  getActivities,
  getActivity,
  addActivity,
  modifyActivity,
  deleteActivity,
  mockRequests
};
