const assert = require('assert');

const config = require('./config.json');

const SamClient = require('../index');
let client;

const mock = require('./mock');

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
});
