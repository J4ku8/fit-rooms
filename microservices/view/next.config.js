module.exports = {
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ["css-loader"],
    });

    return config;
  },
};
