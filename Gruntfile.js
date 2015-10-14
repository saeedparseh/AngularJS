module.exports = function (grunt) {
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
		concat: {
		  js: {
			src: 'src/js/*.js',
			dest: 'des/js/concat.js'
		  },
		  css: {
			src: 'src/css/*.css',
			dest: 'des/css/concat.css'
		  }
		},
		min: {
		  js: {
			src: 'des/js/concat.js',
			dest: 'des/js/concat.min.js'
		  }
		},
        cssmin: {
            target: {
                files: {
                    'des/css/concat.min.css': 'des/css/concat.css'
                }
            }
        },

        
        jshint: {
            jsFiles: ['public/javascripts/**/*.js']                             
        }
    });
    
    // Next one would load plugins
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-min');
	grunt.loadNpmTasks('grunt-contrib-concat');

    // Here is where we would define our task
    grunt.registerTask('default', ['concat','min', 'cssmin']);
};