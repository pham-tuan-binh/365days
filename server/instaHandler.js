const { instaFetch, userFetch } = require("./instagramFetch");
const mcache = require("memory-cache");

exports.instaHandle = async function (req, res) {
  const cacheDuration = 43200;
  try {
    let key = "exp-" + req.url;
    let cachedData = mcache.get(key);
    if (cachedData) {
      return res.status(200).json(cachedData);
    } else {
      let data = await instaFetch(req.query.after, req.query.limit);
      mcache.put(key, data, cacheDuration * 1000);
      return res.status(200).json(data);
    }
  } catch {
    return res.status(500).json({ error: "Something went wrong." });
  }
};

exports.userHandle = async function (req, res) {
  const cacheDuration = 43200;
  try {
    let key = "exp-" + req.url;
    let cachedData = mcache.get(key);
    if (cachedData) {
      return res.status(200).json(cachedData);
    } else {
      let data = await userFetch();
      mcache.put(key, data, cacheDuration * 1000);
      return res.status(200).json(data);
    }
  } catch {
    return res.status(500).json({ error: "Something went wrong." });
  }
};
