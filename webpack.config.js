const { minify } = require('html-minifier-terser')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [new HtmlWebpackPlugin({
        title: "ShortStack Messaging",
        template: "./src/index_template.html",
        minify: true
    })],
    watch: true
}
