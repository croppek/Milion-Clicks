var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');

var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css' 
});

module.exports = {
    entry: SRC_DIR + '/js/index.js',
    output: {
        path: DIST_DIR,
        filename: 'bundle.js',
        //publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015', 'stage-2']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: [ 
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            //publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};

/*Package.JSON Scripts: 

   "test": "echo \"Error: no test specified\" && exit 1",
   "start": "npm run build",
   "build": "webpack-dev-server",
   "build:prod": "webpack -p",
   "install-dependencies": "npm install axios react react-dom react-redux react-router-dom redux redux-promise-middleware redux-thunk --save",
   "install-devDependencies": "npm install babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-2 clean-webpack-plugin css-loader extract-text-webpack-plugin file-loader html-loader html-webpack-plugin node-sass postcss-loader sass-loader webpack webpack-dev-server --save-dev"

*/