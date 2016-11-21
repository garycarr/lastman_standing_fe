let dirName = __dirname;  // eslint-disable-line

module.exports = {
    entry: './app/javascript/index.js',
    output: {
        path: dirName,
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            // Preloader to check the files before babel-loader has transformed them
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css' },
            {
                // Transpiles the javascript files for ES2015 use on browsers
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules\/)/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
                // query: {
                //     inlineRequires: '\/images\/',
                //     helperDirs: [`${dirName}/src/helpers`]
                // }
            }
            // To test
            // {
            //     test: /\.js$/,
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/
            // }
        ]
    }
};
