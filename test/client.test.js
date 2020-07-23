const assert = require('assert');

const config = require('./config.json');

const SamClient = require('../index');
let client;

const mock = require('./mock');
const data = require('./mock/examples.json');

describe('Client tests', () => {
  beforeEach(() => {
    client = new SamClient(config.api_url);
    mock.mockRequests();
  });
  test('Gets the activities list', async () => {
    const activities = await client.getActivities();
    assert.equal(Array.isArray(activities), true, 'Activities array was not received');
    assert.deepEqual(activities, mock.getActivities(), 'Incorrect content of received activities array');
  });
  test('Inserts the activities', async () => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const response = await client.createActivity(item);
      assert.deepEqual(response, item, 'The activity was not inserted');
      // modify in mock
      mock.addActivity(item);
    }
    const activities = await client.getActivities();
    assert.equal(Array.isArray(activities), true, 'Activities array was not received');
    assert.deepEqual(activities, mock.getActivities(), 'Incorrect content of received activities array');
  });
  test('Check the activities list after adding them', async () => {
    const activities = await client.getActivities();
    assert.equal(Array.isArray(activities), true, 'Activities array was not received');
    assert.deepStrictEqual(activities, mock.getActivities(), 'Incorrect content of received activities array');
  });
  test('Returns single activities', async () => {
    const mockedActivities = mock.getActivities();
    for (let i = 0; i < mockedActivities.length; i++) {
      const activity = await client.getActivity(mockedActivities[i]['_id']);
      assert.notEqual(activity, undefined, 'No activity received');
      assert.notEqual(activity.name, undefined, 'No activity name received');
      assert.notEqual(activity.category, undefined, 'No activity category received');
      assert.notEqual(activity.start_date, undefined, 'No start date received');
      assert.notEqual(activity.end_date, undefined, 'No end date received');
    }
  });
  test('Modifies the activities', async () => {
    const mockedActivities = await client.getActivities();
    for (let i = 0; i < mockedActivities.length; i++) {
      const activity = mockedActivities[i];
      activity.name += ' (modified)';
      const response = await client.modifyActivity(activity['_id'], activity);
      assert.equal(response, true, 'Activity was not modified');
      // modify in mock
      mock.modifyActivity(activity);
    }
  });
  test('Check the activities list after modifying them', async () => {
    const activities = await client.getActivities();
    assert.equal(Array.isArray(activities), true, 'Activities array was not received');
    assert.deepStrictEqual(activities, mock.getActivities(), 'Incorrect content of received activities array');
  });
  test('Deletes the activities', async () => {
    const mockedActivities = await client.getActivities();
    for (let i = 0; i < mockedActivities.length; i++) {
      const activity = mockedActivities[i];
      const response = await client.deleteActivity(activity['_id']);
      assert.equal(response, true, 'Activity was not deleted');
      // modify in mock
      mock.deleteActivity(activity['_id']);
    }
  });
  test('Check the activities list after deleting them', async () => {
    const activities = await client.getActivities();
    assert.equal(Array.isArray(activities), true, 'Activities array was not received');
    assert.deepStrictEqual(activities, mock.getActivities(), 'Incorrect content of received activities array');
  });
});
