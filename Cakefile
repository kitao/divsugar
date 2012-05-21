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

apiDir = 'docs/api'
apiSrcDir = 'docs/api_src'

target = "#{targetDir}/#{targetName}.js"
minTarget = "#{targetDir}/#{targetName}.min.js"
srcs = ("#{srcDir}/#{s}" for s in srcFiles)

task 'watch', 'Watch the source files and build the changes', ->
  coffee = spawn 'coffee', ['-c', '-w', '-j', target].concat srcs
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'minify', 'Make the minified version of the target', ->
  yui = spawn 'yuicompressor', [target, '-o', minTarget]
  yui.stdout.on 'data', (data) -> print data.toString()
  yui.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'api', 'Make the api reference', ->
  yuidoc = spawn 'yuidoc', [apiSrcDir, '-C', '-o', apiDir]
  yuidoc.stdout.on 'data', (data) -> print data.toString()
  yuidoc.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'clean', 'Delete the target files', ->
  exec "rm -f #{target}"
  exec "rm -f #{minTarget}"
  exec "rm -rf #{apiDir}/*"
