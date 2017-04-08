/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import validate from 'webpack-validator';
import { dependencies as externals } from './app/package.json';

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

export default validate({
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },{
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /pixi\.js/, loaders: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, loaders: ['expose-loader?Phaser'] },
      { test: /p2\.js/, loaders: ['expose-loader?p2'] }
    ]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    },
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [],

  externals: Object.keys(externals || {})
});
