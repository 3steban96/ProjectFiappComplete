module.exports = function(api) {
  api.cache(false);
  // api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
