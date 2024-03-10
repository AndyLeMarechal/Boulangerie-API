
export default (dataProp, schema) => async(req, res, next) => {
    try {
      await schema.validateAsync(req[dataProp]);
      next();
    } catch (err) {
      res.status(400).json({ error: err.details[0].message });
    }
  };










  