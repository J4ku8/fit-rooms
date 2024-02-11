
module.exports = {
    exportPathMap: function () {
        return {
            '/': { page: '/rooms' },
        };
    },
    webpack: (config, { dev, isServer }) => {
        config.module.rules.push({
            test: /\.css$/,
            use: ['css-loader'],
        });

        return config;
    },
};
