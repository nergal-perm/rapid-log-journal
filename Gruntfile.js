'use strict';

module.exports = function (grunt) {
	// Таймер для определения времени выполнения задач
	require('time-grunt')(grunt);

	// Автоматический загрузчик необходимых задач
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	// Определяем конфигурацию для всех задач
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'app/scripts/{,*/}*.js'
				]
			}
		},

		copy: {
			dist: {
				cwd: 'app',
				src: [ '**', '!styles/**/*.css', '!scripts/**/*.js' ],
				dest: 'dist',
				expand: true
			}
		},

		clean: {
			build: {
				src: [ 'dist/' ]
			}
		},

		useminPrepare: {
			html: 'app/index.html',
			options: {
				dest: 'dist'
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {}
		},

		uglify: {
			dist: {}
		},

		cssmin: {
			dist: {}
		},

		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},
			release: {
				files: [{
					src: [
						'dist/scripts/*.js',
						'dist/styles/*.css'
					]
				}]
			}
		},

		usemin: {
			html: [ 'dist/*.html' ],
			css: [ 'dist/styles/*.css' ],
			options: {
				assetDirs: [ 'dist', 'dist/styles' ]
			}
		},

		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			all: {
				files: [{
					src: [
						'app/scripts/{,*/}*.js'
					],
					expand: true
				}]
			}
		},

		watch: {
	        copy: {
	            files: [ 'app/**', '!app/**/*.css', '!app/**/*.js'],
	            tasks: [ 'build' ]
	        },
	        scripts: {
	            files: ['app/scripts/*.js'],
	            tasks:[ 'build']
	        },
	        styles: {
	            files: ['app/styles/*.css'],
	            tasks:['build']
	        },
	        livereload: {
	            options: {
	                livereload: '<%= connect.options.livereload %>'
	            },
	            files: [
	                'app/{,*/}*.html',
	                '.tmp/styles/{,*/}*.css',
	                'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
	            ]
	      	}
    	},

	    connect: {
	      options: {
	        port: 9000,
	        // Change this to '0.0.0.0' to access the server from outside.
	        hostname: 'localhost',
	        livereload: 35729
	      },
	      dist: {
	        options: {
	          open: true,
	          base:{
	               path: 'dist',
	            options: {
	                index: 'menu.html',
	                maxAge: 300000
	            }
	          }
	        }
	      }
	    }
	});

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'useminPrepare',
		'concat',
		'cssmin',
		'ngAnnotate',
		'uglify',
		'copy',
		'filerev',
		'usemin'
	]);

	grunt.registerTask('serve',['build','connect:dist','watch']);

	grunt.registerTask('default', ['build']);
};