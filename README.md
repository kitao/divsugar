DivSugar - CSS-based 3D Graphics Library
========================================

![alt text](https://github.com/kitao/divsugar/blob/master/docs/logo/divsugar_logo_84x58.png "logo")

## API Reference

### DivSugar


```
DivSugar.EPSILON
DivSugar.DEG_TO_RAD
DivSugar.RAD_TO_DEG
```

#### (Sprite) createScene ( String id = null )

#### (Object) size ()

#### (this) size ( Object size )

#### (this) size ( Number width, Number Height )

```
DivSugar.createScene(id = null)
DivSugar.createSprite(id = null)
```

### Scene
#### Getters
```
scene.perspective()
```
#### Setters
```
scene.perspective(perspective)
```

### Sprite

#### Getters
```
sprite.size()	   // { w: width, h: height }
sprite.position()  // { x: posX, y: posY, z: posX }
sprite.rotation()  // { x: rotX, y: rotY, z: rotZ } (in degree)
sprite.scale()	   // { x: scaleX, y: scaleY, z: scaleZ } (1 means 100%)
sprite.visible()   // visible -> true, invisible -> false
sprite.clip()	   // clipping on -> true, clipping off -> false
sprite.opacity()   // opaque -> 1, transparent -> 0
sprite.image()     // image's url or color 
sprite.imageClip() // { u1: , v1: , u2: , v2: }
```

#### Setters
All of the setter methods return the current object for method chaining.
 
```
sprite.size(width, height)
sprite.size({ w: width, h: height })

sprite.position(x, y, z)
sprite.position({ x: posX, y: posY, z: posZ })

sprite.rotation(x, y, z)
sprite.rotation({ x: rotX, y: rotY, z: rotZ })

sprite.scale(x, y, z)
sprite.scale({ x: scaleX, y: scaleY, z: scaleZ })

sprite.visible(visible)
sprite.clip(clip)
sprite.opacity(opacity)

sprite.image(imageUrl) // like 'http://image.url'
sprite.image(color)    // like '#ff0000'

sprite.imageClip(u1, v1, u2, v2) // (0, 0, 1, 1) means use full area
```

### Vector

#### Properties
```
vector.x
vector.y
vector.z
```

```
vector.set(x, y, z)
vector.set(vec)

vector.negate()
vector.add(vector)
vector.subtract(vector)
vector.multiply(number)
vector.divide(number)

vector.cross(vector)
vector.normalize()

vector.rotateX(deg)
vector.rotateY(deg)
vector.rotateZ(deg)

vector.lerp(to, ratio)
```

```
vector.norm()
vector.squaredNorm()
vector.distance(vector)
vector.dot(vector)
vector.equals(vector)
vector.toString()
```
