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
    const temp = { ...item };
    // get activity
    mockedAxios
      .onGet(`${config.api_url}/activities/${item['_id']}`)
      .reply(200, { activity: temp });
    // modify activity
    temp.name = `${item.name} (modified)`;
    mockedAxios
      .onPut(
        `${config.api_url}/activities/${item['_id']}`,
        { activity: temp }
      )
      .reply(204);
    // delete activity
    mockedAxios
      .onDelete(`/activities/${item['_id']}`)
      .reply(204);
  });
};

const getRandomID = () => {
  let id = '';
  const characters = '0123456789abcdef';
  for (let i = 0; i < 24; i++) {
    const pos = Math.floor(Math.random() * characters.length);
    id += characters[pos];
  }
  return id;
};

const findActivityIndex = activity => mockedData.findIndex(a => a['_id'] === activity['_id']);
const findActivityIndexByID = activity => mockedData.findIndex(a => a['_id'] === activity['_id']);

const getActivities = () => mockedData;
const getActivity = activityID => mockedData.find(a => a['_id'] === activityID);
const addActivity = activity => {
  const details = activity;
  details['_id'] = getRandomID();
  mockedData.push(details);
};
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
