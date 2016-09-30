let fs                = require(`fs`);
let glob              = require(`glob`);
let path              = require(`path`);
let HtmlWebpackPlugin = require(`html-webpack-plugin`);
let webpack           = require(`webpack`);
let ohuiPath          = fs.realpathSync(`${__dirname}/node_modules/ohui`);

module.exports = {

    entry: Object.assign({}, ... glob.sync(`${ohuiPath}/examples/*.js`).map(entry => ({
        [path.basename(entry)]: [ `xterm/src/xterm.css`, `${__dirname}/base.css`, `${__dirname}/base`, `ohui/examples/${path.basename(entry)}` ]
    }))),

    output: {
        path: `${__dirname}/examples`,
        filename: `[name].js`,
        chunkFilename: `[id].bundle.js`,
        publicPath: `/ohui-web/examples`
    },

    resolve: {
        modules: [ `node_modules` ],
        alias: { [`node-tput`]: `${__dirname}/stubs/node-tput` },
        symlinks: false
    },

    module: {
        loaders: [ {
            test: /\.js$/,
            include: [ `${ohuiPath}/sources`, `${ohuiPath}/examples` ],
            loader: `babel`
        }, {
            test: /\.json$/,
            loader: `json`
        }, {
            test: /\.css$/,
            loader: `style!css`
        } ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(/xterm/, false)
    ].concat(glob.sync(`${__dirname}/node_modules/ohui/examples/*.js`).map(entry =>
        new HtmlWebpackPlugin({ filename: `${path.basename(entry, `.js`)}.html`, chunks: [ path.basename(entry) ] })
    ))

};
