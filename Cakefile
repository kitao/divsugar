{print} = require 'util'
{spawn, exec} = require 'child_process'

targetDir = 'build'
targetName = 'divsugar'

sourceDir = 'src'
sourceFiles = [
  'DivSugar.coffee'
  'Vector.coffee'
  'Matrix.coffee'
  'Quaternion.coffee'
  'Scene.coffee'
  'Sprite.coffee'
  'Task.coffee'
]

target = "#{targetDir}/#{targetName}.js"
minTarget = "#{targetDir}/#{targetName}.min.js"
sources = ("#{sourceDir}/#{s}" for s in sourceFiles)

task 'watch', 'Watch source files and build changes', ->
  coffee = spawn 'coffee', ['-c', '-w', '-j', target].concat sources
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'minify', 'Make minified version of target', ->
  yui = spawn 'yuicompressor', [target, '-o', minTarget]
  yui.stdout.on 'data', (data) -> print data.toString()
  yui.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'clean', 'Delete target files', ->
  exec "rm -f #{target} #{minTarget}"
