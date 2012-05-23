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
srcs = ("#{srcDir}/#{s}" for s in srcFiles)

task 'watch', 'Watch the source files and build the changes', ->
  coffee = spawn 'coffee', ['-c', '-w', '-j', target].concat srcs
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'clean', 'Delete the target files', ->
  exec "rm -f #{target}"
