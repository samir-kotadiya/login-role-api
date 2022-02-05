import userController from '../controllers/user';

export default (router, express) => {
  const route = express.Router();

  router.use('/user', route);
  route.post('/register', userController.register);
  route.post('/verifyUser', userController.verifyUser);
  route.post('/login', userController.login);
  route.get('/logout', userController.logout);

  route.get('/me', userController.getProfile);
  route.put('/me', userController.saveProfile);
  route.delete('/:id', userController.delete);
  route.get('/', userController.list);
};