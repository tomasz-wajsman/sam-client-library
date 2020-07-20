const assert = require('assert');
const expect = require('expect');

const config = require('./config.json');

const SamClient = require('../index');
let client;

const mock = require('./mock');

const invalidIds = [
  '1234',
  'blah',
  'BLAHBLAHBLAH',
  'abcd1234',
  'zzzzzzzzzzzzzzzzzzzzzzzz'
];

const invalidActivities = [
  { activity: {} },
  { activity: { name: 'name' } },
  { activity: { name: 'name', category: 'category' } },
  { activity: { name: 'name', category: 'category', start_date: 1 } },
  { activity: { category: 'category', start_date: 1, end_date: 2 } },
  { activity: { distance: 1 } },
  { activity: { start_date: 1, end_date: 2, distance: 1 } },
  { activity: { start_date: 1, end_date: 1 } },
  { activity: { name: '', category: '', start_date: 1, end_date: 2, distance: 1 } },
  { activity: { name: 'name', category: 'category', start_date: 1000, end_date: 1000, distance: 1 } },
  { activity: { name: 'name', category: 'category', start_date: 1000, end_date: 999, distance: 1 } },
  { activity: { name: 'name', category: 'category', start_date: 1, end_date: 2, distance: -1000 } }
];

describe('Client error handling tests', () => {
  beforeAll(() => {
    client = new SamClient(config.api_url);
    mock.mockRequests();
  });
  test('Returns false on incorrect IDs', async () => {
    invalidIds.forEach(id => assert.equal(
      SamClient.checkActivityID(id),
      false,
      `Incorrect ID '${id}' is correct`
    ));
  });
  test('Throws an error for getting unexisting activity', async () => {
    try {
      await client.getActivity('123456');
    } catch (e) {
      assert.equal(e, 404, 'Unexisting activity request threw other error than 404');
    }
  });
  test('Throws an error for modyfying unexisting activity', async () => {
    try {
      await client.modifyActivity('123456');
    } catch (e) {
      assert.equal(e, 404, 'Unexisting activity request threw other error than 404');
    }
  });
  test('Throws an error for deleting unexisting activity', async () => {
    try {
      await client.deleteActivity('123456');
    } catch (e) {
      assert.equal(e, 404, 'Unexisting activity request threw other error than 404');
    }
  });
});
