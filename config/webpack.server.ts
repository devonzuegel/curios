import * as path from 'path'
import * as Webpack from 'webpack'

const nodeExternals = require('webpack-node-externals')

function projectPath(...directories: string[]) {
  return path.join(__dirname, '..', ...directories)
}

interface ICuriosWebWebpackConfig {
  target: 'node'
  externals: Webpack.ExternalsElement[]
  entry: Webpack.Entry
  output: Webpack.Output
  resolve: Webpack.Resolve
  module: Webpack.NewModule
}

const config: ICuriosWebWebpackConfig = {
  // Targeting a node environment
  target: 'node',

  // Ignore C based ndoe externals like the PG adapter
  externals: [nodeExternals()],

  entry: {
    // API server entrypoint
    server: [projectPath('server', 'index.ts')],
  },

  output: {
    path: projectPath('build'),
    filename: `[name].js`,
  },

  resolve: {
    modules: [
      projectPath('client'),
      projectPath('server'),
      projectPath('node_modules'),
    ],
    extensions: [
      // Resolve .ts and .tsx in our project
      '.ts',
      '.tsx',
      // Resolve .js files for node_modules
      '.js',
    ],
    alias: {
      '@server': projectPath('server'),
      '@client': projectPath('client', 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.server.json',
            },
          },
        ],
      },
    ],
  },
}

export default config
