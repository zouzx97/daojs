const _ = require('lodash');
const {Volume} = require('memfs');
const fs = require('fs');
const {Union} = require('unionfs');
const webpack = require('webpack');
const path = require('path');
fs.mkdirp = require('mkdirp');

const SRC_FILE_PATH = 'memory-src-files';
const DIST_FILE_PATH = 'memory-dist-files';
const src = (name = '') => path.join(__dirname, SRC_FILE_PATH, name);
const dist = (name = '') => path.join(__dirname, DIST_FILE_PATH, name);

function build(entry, files) {
  return new Promise((resolve, reject) => {
    const ufs = new Union();
    ufs
      .use(fs)
      .use(Volume.fromJSON(_.mapKeys(files, (content, name) => src(name))));
    ufs.join = path.join;

    const compiler = webpack({
      entry: src(entry),
      output: {
        path: dist(),
        filename: 'index.js',
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              [
                "import",
                {
                  "libraryName": "antd",
                  "libraryDirectory": "es",
                  "style": "css",
                },
              ],
            ],
          },
        }, {
          test: /\.css/,
          loader: ['style-loader', 'css-loader'],
        }],
      },
    });
    compiler.inputFileSystem = ufs;
    compiler.resolvers.normal.fileSystem = compiler.inputFileSystem;
    compiler.resolvers.context.fileSystem = compiler.inputFileSystem;
    compiler.outputFileSystem = ufs;
    compiler.run((err, status) => {
      if (err) {
        reject(err);
      } else {
        resolve(ufs.readFileSync(dist('index.js'), 'utf8'));
      }
    });
  });
}

module.exports = build;
