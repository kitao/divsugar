{print} = require 'util'
{spawn, exec} = require 'child_process'

targetDir = 'build'
targetFile = 'divsugar.js'

sourceDir = 'src'
sourceFiles = [
  'DivSugar.coffee'
  'Screen.coffee'
  'Sprite.coffee'
]

target = "#{targetDir}/#{targetFile}"
sources = "#{sourceDir}/#{s}" for s in sourceFiles

task 'watch', 'Watch source files and build changes', ->
  coffee = spawn 'coffee', ['-c', '-w', '-j', target].concat sources
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()

task 'clean', 'Delete target file', ->
  exec "rm -f #{target}"
