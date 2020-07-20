// Axios mock
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mockedAxios = new MockAdapter(axios);

const activities = [];

const mockRequests = items => {
  // reset the mock and the mock the requests again
  mockedAxios.reset();

  // all activities
  mockedAxios.onGet('/activities')
    .reply(200, { activities: items });

  // add an activity
  mockedAxios.onPost('/activities')
    .reply(201);

  items.forEach(item => {
    // get activity
    mockedAxios.onGet(`/activities/${item['_id']}`)
      .reply(200, { activity: item });
    // modify activity
    mockedAxios.onPut(`/activities/${item['_id']}`)
      .body({
        name: `${item.name} (modified)`,
        category: item.name,
        start_date: item.start_date,
        end_date: item.end_date
      })
      .reply(204);
    // delete activity
    mockedAxios.onDelete(`/activities/${item['_id']}`)
      .reply(204);
  });
};

const findActivityIndex = activity => activities.findIndex(a => a['_id'] === activity['_id']);
const findActivityIndexByID = activity => activities.findIndex(a => a['_id'] === activity['_id']);

const getActivities = () => activities;
const getActivity = activityID => activities.find(a => a['_id'] === activityID);
const addActivity = activity => activities.push(activity);
const modifyActivity = activity => {
  activities[findActivityIndex(activity)] = activity;
};
const deleteActivity = activityID => activities.splice(findActivityIndexByID(activityID), 1);

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
