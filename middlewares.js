module.exports = (req, res, next) => {
  const {method, body:{id}, url} = req;

  // console.log( '@exports : ', body);

  if (method === 'POST' && !id) {

    req.body.id = Date.now();
  }

  next();
}