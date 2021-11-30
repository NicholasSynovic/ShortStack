const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path")

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "ShortStack Messaging",
            template: "./src/index.html",
            minify: true
    }),
        new CopyPlugin({
            patterns: [
                { from: "./src/img", to: "img" },
                { from: "./src/css", to: "css" }
            ],
        })
    ],
    watch: true
}
