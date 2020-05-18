const brand = require('../controller/brandController.js');
const item = require('../controller/itemController.js');
module.exports = function(express){
  const router = express.Router();
  router.get('/', brand.getAll);
  router.post('/', brand.save);
  router.get('/:id', brand.get);
  router.put('/:id', brand.update);
  router.delete('/:id', brand.delete);
  router.get('/:id/withItem', item.get);
  router.get('/ini/test', brand.getWithItems);


  return router;
};