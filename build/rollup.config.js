import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support

export default {
    input: 'src/entry.js', // Path relative to package.json
    output: {
        name: 'PersianCalander',
        exports: 'named',
    },
    plugins: [
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
            template: {
              isProduction: true
            }
        }),
        buble(), // Transpile to ES5
    ],
};

// import vue from "rollup-plugin-vue";
// import buble from "rollup-plugin-buble";
// import commonjs from "rollup-plugin-commonjs";
// import replace from "rollup-plugin-replace";
// import uglify from "rollup-plugin-uglify-es";
// import minimist from "minimist";

// const argv = minimist(process.argv.slice(2));

// const config = {
//   input: "src/entry.js",
//   output: {
//     name: "SimpleAlert",
//     exports: "named"
//   },
//   plugins: [
//     external,
//     replace({
//       "process.env.NODE_ENV": JSON.stringify("production")
//     }),
//     commonjs(),
//     vue({
//       css: true,
//       compileTemplate: true,
//       template: {
//         isProduction: true
//       }
//     }),
//     buble()
//   ]
// };

// // Only minify browser (iife) version
// if (argv.format === "iife") {
//   config.plugins.push(uglify());
// }

// export default config;