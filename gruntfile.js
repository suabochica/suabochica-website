// Gruntfile.js
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    base: './',
                    port: '4000',
                    host: '*',
                    livereload: true
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
                    expand:true,
                    cwd:'app',
                    src:[ 'index.haml'],
                    dest:'public',
                    ext:'.html'
                }]
            },
            showcase: {
                files: [{
                    expand:true,
                    cwd:'app/haml',
                    src:[ '**/*.haml', '!partials/*.haml'],
                    dest:'public/html',
                    ext:'.html'
                }]
            }
        },

        sass: {
            dist:{
                files:[{
                    expand:true,
                    cwd:'app/sass',
                    src:['**/*.sass'],
                    dest:'public/css',
                    ext:'.css'
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
                files:['app/haml/**/*.haml'],
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
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean', 'haml', 'sass', 'coffee', 'min', 'cssmin',]);
    grunt.registerTask('dev', ['build', 'connect', 'watch']);
};
