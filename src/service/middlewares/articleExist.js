'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const article = service.findOne(articleId);

  if (!article) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(`Article #${articleId} isn't found`);
  }

  res.locals.article = article;

  return next();
};