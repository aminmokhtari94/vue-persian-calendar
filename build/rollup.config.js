import commonjs from '@rollup/plugin-commonjs' // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import buble from '@rollup/plugin-buble' // Transpile/polyfill with reasonable browser support
// import replace from '@rollup/plugin-replace'
import { terser }  from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/entry.js', // Path relative to package.json
  output: {
    name: 'PersianCalendar',
    exports: 'named'
  },
  external: ['vue', 'Vue'],
  plugins: [
    // replace({
    //   __buildEnv__: 'production',
    //   __buildDate__: () => new Date()
    // }),
    commonjs(),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
      template: {
        isProduction: true
      }
    }),
    postcss({
      config: {
        path: './postcss.config.js'
      },
      extensions: ['.css'],
      extract: true,
      minimize: true
    }),
    buble(), // Transpile to ES5
    terser()
  ]
}
