window.onload = function() {
  "use strict";

  var scn = DivSugar.createScene();
  scn.setSize(600, 400).setPosition(200, 30).setImage('#0000ff');
  document.body.appendChild(scn);

  var spr = DivSugar.createSprite();
  spr.setSize(200, 200).setImage('http://placekitten.com/200/200').setPosition(330, 130, 0).setOpacity(0.5).rotate(0, 0, 30);
  spr.setImageClip(0, 0, 1, 1);
  scn.appendChild(spr);

  DivSugar.addCSSAnimation('testAnim', {
    from: {
      imageClip: [0,0,1,1],
      visible: true,
      clip: true,
      opacity: 1
    },
    '100%': {
      size: [300, 300],
      imageClip: [0.5,0.5,1,1],
      opacity: 0.5,
      iamge: 'http://placekitten.com/300/300',
      visible: false,
      rotate: [0, 40, 0]
    }
  });

  var task = DivSugar.createTask('hoge');
  var vec = new DivSugar.Vector();

  //spr.playCSSAnimation('testAnim', 2, 'linear', 0, 'infinite', 'alternate');

  task.onUpdate = function(elapsedTime) {
    var width = spr.getWidth();
    var height = spr.getHeight();

    spr.setSize(width + elapsedTime * 0.05, height + elapsedTime * 0.05).rotate(elapsedTime * 0.05, 0, 0);
    if (width > 400) {
      this.destroy();
    }
  };

  task.onDestroy = function() {
    spr.parentNode.removeChild(spr);
  };

  DivSugar.rootTask.appendChild(task);
};
