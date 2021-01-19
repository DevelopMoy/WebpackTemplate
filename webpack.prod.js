const HtmlWebPackPlugin = require ('html-webpack-plugin'); // CON REQUIRE NODE CARGA ARCHIVOS DE OTROS PAQUETES
const extractMiniCss = require('mini-css-extract-plugin'); // REQUERIDO PARA EXPORTAR ARCHIVOS CSS INDIVIDUALES
const plugCopy = require('copy-webpack-plugin');
const plugMinimCSS = require('optimize-css-assets-webpack-plugin');
const babelMinifPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');



module.exports ={
    mode:'production', // DEVELOPMENT - PRODUCTION
    optimization: { // MINIMIZADOR DE CSS
        minimizer: [new plugMinimCSS()]
    },
    output: { // SALIDA DEL ARCHIVO PRINCIAL JS
        path: path.resolve(process.cwd(), 'dist'),
        filename: "main.[contenthash].js"// NOS CREA EL ARCHIVO  CON UN HASH PARA EVITAR EL CACHE
    },
    module:{
        rules:[ // REGLAS PARA LOS MODULOS (CONFIGURAR LOADERS, ETC)
            { // REGLA DEL HTML LOADER
                test: /\.html$/, // EXPRESION REGULAR A LA QUE SE APLICARÁ
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize:true
                }
            },
            { // REGLA PARA PODER IMPORTAR ARCHIVOS CSS
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {// REGLA PARA EXPORTAR UN ARCHIVO INDIVIDUAL GENERAL DE CSS
                test: /styles\.css$/,
                use: [
                    extractMiniCss.loader,
                    'css-loader'
                ]

            },
            { // REGLA PARA EL FILE LOADER
                test: /\.(png|svg|jpg|gif)$/,
                use : [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {// REGLA PARA EL BABEL QUE CONVIERTE JS ACTUAL A JS DE VERSIONES ANTERIORES
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin(
            {template: "./src/index.html"}
            /* {// NOS PERMITE EXPORTAR EL ARCHIVO HTML
            template: './src/index.html',
            filename: "./index.html",
            inject: "body"
        }*/),
        new extractMiniCss({
            filename: '[name].[contenthash].css', // NOMBRE DEL ARCHIVO EN PRODUCCION
            ignoreOrder:false
        }),
        new plugCopy ({
            patterns: [{
                from: 'src/assets',
                to: 'assets/'
            }]
        }),
        new babelMinifPlugin(),
    ]
}