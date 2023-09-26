const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

GroupRouter.post('/create-group', GroupController.createGroup);
GroupRouter.delete('/:course/delete-group', GroupController.deleteGroup);
GroupRouter.get('/getAllGroups', GroupController.getAllGroups);
GroupRouter.get('/get-course/:id', GroupController.getGroup);
GroupRouter.get('/getMyGroups', GroupController.getMyGroups);
GroupRouter.put('/:groupId/set-resource/:type/', GroupController.setResource);
GroupRouter.post('/:groupId/invite/:username', GroupController.InviteMemberToGroup);
GroupRouter.put('/join-group', GroupController.joinGroup);

module.exports = GroupRouter;
