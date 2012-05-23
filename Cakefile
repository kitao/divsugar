{print} = require 'util'
{spawn, exec} = require 'child_process'

targetDir = 'build'
targetName = 'divsugar'

srcDir = 'src'
srcFiles = [
  'DivSugar.coffee'
  'Vector.coffee'
  'Matrix.coffee'
  'Quaternion.coffee'
  'Scene.coffee'
  'Node.coffee'
  'Task.coffee'
  'Ease.coffee'
]

target = "#{targetDir}/#{targetName}.js"
minTarget = "#{targetDir}/#{targetName}.min.js"
srcs = ("#{srcDir}/#{s}" for s in srcFiles)

task 'watch', 'Watch the source files and build the changes', ->
  coffee = spawn 'coffee', ['-c', '-w', '-j', target].concat srcs
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'minify', 'Make the minified version of the target', ->
  exec "yuicompressor #{target} -o #{minTarget}", (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'clean', 'Delete the target files', ->
  exec "rm -f #{target} #{minTarget}"
