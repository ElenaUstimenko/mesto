const autoprefixer = require('autoprefixer'); // подключение плагинов в файл
const cssnano = require('cssnano');

module.exports = {
  // подключение плагинов к PostCSS
  plugins: [
    // подключение autoprefixer
    autoprefixer, //научит PostCSS добавлять вендорные префиксы
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' }) //займётся минификацией css-кода
  ]
}; 