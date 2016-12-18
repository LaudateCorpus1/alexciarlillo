var src   = "./src";
var dest  = "./dist";
var npm   = "./node_modules";

module.exports = {
  clean: {
    dest: dest
  },
  sass: {
    src: src + "/styles/**/*.scss",
    dest: dest + '/styles',
    settings: {
      outputStyle: 'compressed', // libsass doesn't support expanded yet
      includePaths: [
        npm + '/bootstrap-sass/assets/stylesheets/',
        npm + '/font-awesome/scss/'
      ]
    }
  },
  icons: {
    src: npm + "/font-awesome/fonts/**.*",
    dest: dest + '/fonts'
  },
  pug: {
    src: src + '/htdocs/**/*.pug',
    compile: src + '/htdocs/*.pug',
    dest: dest
  },
  browserSync: {
    server: {
      baseDir: "./dist"
    }
  },
  images: {
    src: src + '/images/**/*',
    dest: dest + '/images'
  },
  browserify: {
      // A separate bundle will be generated for each
      // bundle config in the list below
      bundleConfigs: [{
        entries: src + '/scripts/main.js',
        dest: dest + '/scripts',
        outputName: 'main.js',
        loadMaps: true
      }]
  }
};
