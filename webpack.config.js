const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключение плагина html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключение плагина очистки
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключение mini-css-extract-plugin 

module.exports = {
  entry: { main: './src/scripts/index.js' }, 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },
  mode: 'development',
  devtool: 'eval-source-map', // чтобы можно было искать ошибки в console.log
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules — это массив правил
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
        // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource', //позволяет переносить исходные файлы в конечную сборку в том же формате
        generator: {
          filename: 'images/[hash][ext]',
        }
      },
      {
        test: /\.(woff(2)?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]',
        }
      },
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader, { // при обработке этих файлов нужно использовать
        loader: 'css-loader', // MiniCssExtractPlugin.loader и css-loader
        options: { importLoaders: 1 } // если используется @import в css-файлах, 
                                      //после подключения postcss-loader, нужно изменить то, как подключается css-loader
        },
        'postcss-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // подключение плагина
    new MiniCssExtractPlugin({
      filename: 'index.css' // можно так преименовать
    }) // подключение плагина для объединения файлов
  ]
}; 