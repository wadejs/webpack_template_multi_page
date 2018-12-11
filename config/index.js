/*
 * @Author: wadejs
 * @Date: 2018-12-11 16:09:16
 * @GitHub: 'https://github.com/wadejs'
 * @Blog: 'http://blog.wadejs.cn'
 * @Last Modified by: wadejs
 * @Last Modified time: 2018-12-11 16:53:53
 */
module.exports = {
  dev: {
    devServer: {
      clientLogLevel: 'warning',
      // contentBase: path.resolve(__dirname, 'src/public'),
      compress: true,
      host: 'localhost',
      port: 8888,
      inline: true,
      open: false,
      quiet: true
    }
  }
}