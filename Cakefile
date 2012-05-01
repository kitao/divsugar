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
  'Node.coffee'
  'Task.coffee'
]

target = "#{targetDir}/#{targetName}.js"
minTarget = "#{targetDir}/#{targetName}.min.js"
sources = ("#{sourceDir}/#{s}" for s in sourceFiles)

task 'watch', 'Watch the source files and build the changes', ->
  coffee = spawn 'coffee', ['-c', '-w', '-j', target].concat sources
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'minify', 'Make a minified-version of the target', ->
  exec "yuicompressor #{target} -o #{minTarget}", (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'clean', 'Delete the target files', ->
  exec "rm -f #{target} #{minTarget}"
