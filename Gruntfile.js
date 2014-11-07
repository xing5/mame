module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            minify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                expand: false,
                src: ['public/stylesheets/*.css', '!public/stylesheets/*.min.css'],
                dest: 'deploy/stylesheets/style.min.css'
            },
        },

        uglify: {
            index : {
                options: {
                    banner: '/*! home.min.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                src: [
                    'public/javascripts/animo.js',
                    'public/javascripts/home.js',
                    'public/javascripts/wxshare.js',
                    'public/javascripts/ga.js'
                ],
                dest: 'deploy/javascripts/home.min.js'
            },
            me : {
                options: {
                    banner: '/*! me.min.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                src: [
                    'public/javascripts/animo.js',
                    'public/javascripts/rainbowvis.js',
                    'public/javascripts/bootstrap-slider.min.js',
                    'public/javascripts/me.js',
                    'public/javascripts/wxshare.js',
                    'public/javascripts/ga.js'
                ],
                dest: 'deploy/javascripts/me.min.js'
            },
            her : {
                options: {
                    banner: '/*! her.min.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                src: [
                    'public/javascripts/animo.js',
                    'public/javascripts/rainbowvis.js',
                    'public/javascripts/bootstrap-slider.min.js',
                    'public/javascripts/her.js',
                    'public/javascripts/wxshare.js',
                    'public/javascripts/ga.js'
                ],
                dest: 'deploy/javascripts/her.min.js'
            },
            letter : {
                options: {
                    banner: '/*! letter.min.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                src: [
                    'public/javascripts/md5.js',
                    'public/javascripts/letter.js',
                    'public/javascripts/ga.js'
                ],
                dest: 'deploy/javascripts/letter.min.js'
            },
            story : {
                options: {
                    banner: '/*! story.min.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                src: [
                    'public/javascripts/wxshare.js',
                    'public/javascripts/ga.js'
                ],
                dest: 'deploy/javascripts/story.min.js'
            }
        },

        exec: {
            deploy: {
                cmd: './deploy.sh'
            }
        },

        processhtml: {
            dist: {
                options: {
                    process: true
                },
                files: {
                    'deploy/index.html': ['deploy/index.html'],
                    'deploy/me.html': ['deploy/me.html'],
                    'deploy/her.html': ['deploy/her.html'],
                    'deploy/letter.html': ['deploy/letter.html'],
                    'deploy/story.html': ['deploy/story.html'],
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-exec');
    grunt.registerTask('default', ['cssmin', 'uglify', 'exec', 'processhtml']);
};