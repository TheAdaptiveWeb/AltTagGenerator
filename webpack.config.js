const path = require("path");

module.exports = {
    entry: {
        main: "./index.ts"
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "main.js"
    }
};