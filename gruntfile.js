// Gruntfile.js
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 4000,
                    livereload: true,
                    base: './public',
                    host: '*'
                }
            }
        },

        clean: {
            build: {
                src: ['public/js', 'public/sass']
            }
        },

        haml: {
            index: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: [ 'index.haml'],
                    dest: 'public',
                    ext: '.html'
                }]
            },
            showcase: {
                files: [{
                    expand: true,
                    cwd: 'app/haml',
                    src: [ '**/*.haml', '!partials/*.haml'],
                    dest: 'public/html',
                    ext: '.html'
                }]
            }
        },

        sass: {
            dist:{
                files:[{
                    expand: true,
                    cwd: 'app/sass',
                    src: ['**/*.sass'],
                    dest: 'public/css',
                    ext: '.css'
                }]
            }
        },

        coffee: {
            compile: {
                options: {
                    bare: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/coffee',
                    src: ['**/*.coffee', '**/*.js'],
                    dest: 'public/js',
                    ext: '.js'
                }]
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7,
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/images/png',
                    src: ['*.png'],
                    dest: 'public/assets/images/png',
                    ext: '.png',
                }]
            },
            jpg: {
                options: {
                    progressive: true,
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/images/jpg',
                    src: ['*.jpg'],
                    dest: 'public/assets/images/jpg',
                    ext: '.jpg',
                }]
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/assets/favicon',
                        src: ['favicon.ico'],
                        dest: 'public/assets/favicon/',
                        filter: 'isFile',
                    }, {
                        expand: true,
                        cwd: 'app/assets/pdf',
                        src: ['*.pdf'],
                        dest: 'public/assets/pdf/',
                    }, {
                        expand: true,
                        cwd: 'app/assets/fonts',
                        src: ['**/*.{eot,svg,ttf,woff,otf}'],
                        dest: 'public/assets/fonts/',
                        filter: 'isFile',
                    }, {
                        expand: true,
                        cwd: 'app',
                        src: ['*.{txt,xml.gz}'],
                        dest: 'public',
                        filter: 'isFile',
                    }
                ]
            }
        },

        min: {
            dist: {
                options: {
                    report: 'gzip'
                },
                files:[{
                    src: ['public/js/backgrounds.js', 'public/js/smooth_state.js', 'public/js/transitions.js', 'public/js/google_analytics.js'],
                    dest: 'public/js/sib_scripts.min.js'
                }]
            }
        },

        cssmin: {
            dist: {
                options: {
                    report: false
                },
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            haml:{
                files:['app/*.haml', 'app/haml/**/*.haml'],
                tasks:['haml'],
            },

            styles:{
                files:['app/sass/**/*.sass'],
                tasks:['sass'],
            },

            js: {
                files: ['app/coffee/**/*.coffee'],
                tasks: ['coffee'],
            },

            livereload: {
                options: {
                    livereload: true,
                },
                files:'public/**/*'
            },
        },
    });

    grunt.loadNpmTasks('grunt-haml2html');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-yui-compressor');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean', 'haml', 'sass', 'coffee', 'imagemin', 'copy' ,'min', 'cssmin']);
    grunt.registerTask('dev', ['clean', 'haml', 'sass', 'coffee', 'copy', 'min', 'connect', 'watch']);
};
