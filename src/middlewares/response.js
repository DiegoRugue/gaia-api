module.exports = (req, res, next) => {
  res.ok = (content) => {
    res.status(200).json(content);
    next();
  };

  res.create = (content) => {
    res.status(201).json(content);
    next();
  };

  res.error = (message, code = 500) => {
    res.status(code).json({ error: message });
    next();
  };

  next();
};
