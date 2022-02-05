import resourceController from '../controllers/resource';
import authorize from '../middlewares/permission';
import Role from '../utils/roles';

export default (router, express) => {
  const route = express.Router();

  router.use('/resource', route);
  route
    .get('/public/all', resourceController.listAllPublicResources)
    .get('/only-admin/all', authorize(Role.Admin), resourceController.listAllOnlyAdminOrPrivateResources)
    .get('/private/all', authorize([Role.Admin, Role.User]), resourceController.listAllPrivateResources)
    .get('/private/:resourceId', authorize([Role.Admin, Role.User]), resourceController.getPrivateResource)
    .delete('/private/:resourceId', authorize([Role.Admin, Role.User]), resourceController.deletePrivateResource)
    .post('/private', authorize([Role.Admin, Role.User]), resourceController.createPrivateResource)
    .put('/private/:resourceId', authorize([Role.Admin, Role.User]), resourceController.updatePrivateResource)
};