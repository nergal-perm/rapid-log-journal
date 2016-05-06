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
		}
	});

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		'filerev',
		'usemin'
	]);

	grunt.registerTask('default', ['build']);
};