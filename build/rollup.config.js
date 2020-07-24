import commonjs from '@rollup/plugin-commonjs' // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import buble from '@rollup/plugin-buble' // Transpile/polyfill with reasonable browser support
// import replace from '@rollup/plugin-replace'
import { terser }  from 'rollup-plugin-terser'
import sass from 'rollup-plugin-sass'

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
    sass(),
    buble(), // Transpile to ES5
    terser()
  ]
}
