/*eslint-env node*/
// FUSION SEED APP GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -
//

/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulp' folder. Any files in that directory get
 *  automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

var gulp       = require('gulp');
var argv       = require('yargs').argv;
var requireDir = require('require-dir');

// 2. FILE PATHS
// - - - - - - - - - - - - - - -
// Specify paths & globbing patterns for tasks.
global.paths = {
  assets: [
    './client/**/*.*',
    '!./client/templates/**/*.*',
    '!./client/assets/{scss,js,components}/**/*.*'
  ],
  // Sass will check these folders for files when you use @import.
  sass: [
    'client/assets/scss',
    'bower_components/foundation-apps/scss',
    'bower_components/angucomplete-alt/angucomplete-alt.css',
    'client/assets/components/**/*.scss',

    // Bootstrap for Angular UI
    // 'bower_components/bootstrap/dist/css/bootstrap.css',
    // 'bower_components/bootstrap/dist/css/bootstrap-theme.css'
  ],
  // These files include Foundation for Apps and its dependencies
  foundationJS: [
    'bower_components/lodash/lodash.js',
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
    'bower_components/tether/tether.js',
    'bower_components/hammerjs/hammer.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angucomplete-alt/angucomplete-alt.js',
    'bower_components/angular-rison/dist/angular-rison.js',
    'bower_components/foundation-apps/js/vendor/**/*.js',
    'bower_components/foundation-apps/js/angular/**/*.js',
    '!bower_components/foundation-apps/js/angular/app.js',
    'bower_components/ng-orwell/Orwell.js',
    'bower_components/humanize/humanize.js',
    'bower_components/angularjs-humanize/src/angular-humanize.js',

    // D3
    'bower_components/d3/d3.js',
    // NVD3 + Gridster
    'bower_components/nvd3/build/nv.d3.js',
    'bower_components/angular-nvd3/dist/angular-nvd3.js',
    'bower_components/angular-gridster/src/angular-gridster.js',
    // Angular UI Bootstrap
    'bower_components/angular-touch/angular-touch.js',
    'bower_components/angular-bootstrap/ui-bootstrap.js'
  ],
  // These files are for your app's JavaScript
  appJS: [
    'client/assets/js/app.js',
    'client/assets/js/services/*.js',
    'client/assets/js/controllers/*.js',
    'client/assets/js/utils/**/*.js',
    'client/assets/components/**/*.js',
    // Dashboard app
    'client/assets/js/dashboard/**/*.js'
  ],
  components: [
    'client/assets/components/**/*.html',
    'bower_components/foundation-apps/js/angular/components/**/*.html'
  ],
  configJS: [
    './FUSION_CONFIG.js'
  ],
  configJSSample: [
    './FUSION_CONFIG.sample.js'
  ]
};

// Check for --production flag
global.isProduction = !!(argv.production);

// 3. TASKS
// - - - - - - - - - - - - - - -

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', { recurse: false });


// Default task
//
// builds your app, starts a server, and recompiles assets when they change.

gulp.task('default', ['serve']);
