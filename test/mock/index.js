const mock = [];

const findActivityIndex = activity => mock.findIndex(a => a['_id'] === activity['_id']);
const findActivityIndexByID = activity => mock.findIndex(a => a['_id'] === activity['_id']);

const getActivities = () => mock;
const getActivity = activityID => mock.find(a => a['_id'] === activityID);
const addActivity = activity => mock.push(activity);
const modifyActivity = activity => {
  mock[findActivityIndex(activity)] = activity;
};
const deleteActivity = activityID => mock.splice(findActivityIndexByID(activityID), 1);

module.exports = {
  findActivityIndex,
  findActivityIndexByID,
  getActivities,
  getActivity,
  addActivity,
  modifyActivity,
  deleteActivity
};
