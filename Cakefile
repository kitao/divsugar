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
  'Ease.coffee'
]

target = "#{targetDir}/#{targetName}.js"
sources = ("#{sourceDir}/#{s}" for s in sourceFiles)

task 'watch', 'Watch the source files and build the changes', ->
  coffee = spawn 'coffee', ['-c', '-w', '-j', target].concat sources

  coffee.stdout.on 'data', (data) ->
    print data.toString()
    exec "uglifyjs -nc --overwrite #{target}"

  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'clean', 'Delete the target files', -> exec "rm -f #{target}"
