const { Router } = require("express");

const TagsController = require('../controllers/TagsController');

const tagsRoutes = Router();

const tagsController = new TagsController();


tagsRoutes.get("/:user_id", tagsController.showTags);
// usersRoutes.put("/:id", tagsController.update);

module.exports = tagsRoutes;
