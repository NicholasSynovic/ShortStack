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
        new HtmlWebpackPlugin({
            title: "ShortStack Messaging",
            filename: "signIn.html",
            template: "./src/signIn.html",
            minify: true
        }),
        new HtmlWebpackPlugin({
            title: "ShortStack Messaging",
            filename: "signUp.html",
            template: "./src/signUp.html",
            minify: true
        }),
        new HtmlWebpackPlugin({
            title: "ShortStack Messaging",
            filename: "app/index.html",
            template: "./src/app/index.html",
            minify: true
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/img", to: "img" },
                { from: "./src/css", to: "css" },
                { from: "./src/components", to: "components" }
            ],
        })
    ],
    // watch: true
}
