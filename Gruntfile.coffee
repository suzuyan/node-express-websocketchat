'use strict'
request = require('request')
module.exports = (grunt) ->
  
  # show elapsed time at the end
  require('time-grunt') grunt
  
  # load all grunt tasks
  require('load-grunt-tasks') grunt
  reloadPort = 35729
  files = undefined
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    develop:
      server:
        file: 'server.js'
    # 更新監視
    watch:
      options:
        nospawn: true
        livereload: reloadPort
      js:
        files: [
          'server.js'
          'app/controllers/*.js'
          'app/models/*.js'
          'config/*.js'
          'public/src/js/*.js'
        ]
        tasks: [
          'concat'
          'uglify'
          'develop'
          'delayed-livereload'
        ]
      css:
        files: [
          'public/src/css/*.css'
        ]
        tasks: [
          'concat'
          'cssmin'
          'develop'
          'delayed-livereload'
        ]
      jade:
        files: ['app/views/*/*.jade']
        options:
          livereload: reloadPort
      ect:
        files: ['app/views/*/*.ect']
        options:
          livereload: reloadPort
    # deploy bower
    bower:
      install:
        options:
          # 出力するディレクトリ
          targetDir: './public/vendors'
          # clean targetDir before
          cleanTargetDir: false
          # e.g.) libs/{js,css}/PACKAGE_NAME/
          #layout: 'byType'
          # e.g.) libs/PACKAGE_NAME/{js,css}/
          layout: 'byComponent'

    mkdir:
      all:
        options:
          create: [
            'public/js'
            'public/css'
          ]

    concat:
      lib:
        files:
          'public/js/main.js': [
            'public/src/js/*.js'
          ]
          'public/css/main.css': [
            'public/src/css/*.css'
          ]
    # jsをminify
    uglify:
      my_target:
        files:
          'public/js/main.min.js': ['public/js/main.js']
    # cssをminify
    cssmin:
      compress:
        files:
          'public/css/main.min.css': ['public/css/main.css']
    # 不要なディレクトリ、ファイル削除
    clean:
      uglify: ['public/js/main.js']
      cssmin: ['public/css/main.css']
      bower: ['bower_components']
      src: ['public/src']


  grunt.config.requires 'watch.js.files'
  files = grunt.config('watch.js.files')
  files = grunt.file.expand(files)
  grunt.registerTask 'delayed-livereload', 'Live reload after the node server has restarted.', ->
    done = @async()
    setTimeout (->
      request.get 'http://localhost:' + reloadPort + '/changed?files=' + files.join(','), (err, res) ->
        reloaded = not err and res.statusCode is 200
        if reloaded
          grunt.log.ok 'Delayed live reload successful.'
        else
          grunt.log.error 'Unable to make a delayed live reload.'
        done reloaded
        return

      return
    ), 500
    return

  ## development
  grunt.registerTask 'dev', [
    'bower'
    'mkdir'
    'concat'
    'uglify'
    'cssmin'
    'develop'
    'watch'
  ]
  ## production
  grunt.registerTask 'prod', [
    'bower'
    'mkdir'
    'concat'
    'uglify'
    'cssmin'
    'clean'
  ]

  # for heroku
  ## development
  grunt.registerTask 'heroku:development', [
    'bower'
    'mkdir'
    'concat'
    'uglify'
    'cssmin'
  ]
  ## production
  grunt.registerTask 'heroku:production', [
    'bower'
    'mkdir'
    'concat'
    'uglify'
    'cssmin'
    'clean'
  ]

  return
