const assert = require('assert');

const config = require('./config.json');

const SamClient = require('../index');
let client;

const mock = require('./mock');
const data = require('./mock/examples.json');

describe('Client tests', () => {
  beforeAll(() => {
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
      assert.equal(response, true, 'The activity was not inserted');
      mock.addActivity(item);
    }
    const activities = await client.getActivities();
    assert.equal(Array.isArray(activities), true, 'Activities array was not received');
    assert.deepEqual(activities, mock.getActivities(), 'Incorrect content of received activities array');
  });
});
