const assert = require('assert');
const expect = require('expect');

const config = require('./config.json');

const SamClient = require('../index');
let client;

const mock = require('./mock');

describe('Client error handling tests', () => {
  beforeAll(() => {
    client = new SamClient(config.api_url);
    mock.mockRequests();
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
