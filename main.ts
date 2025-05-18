namespace SpriteKind {
    export const upgradeProjectile = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(list[0])
    direction = 0
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(list[3])
    direction = 3
})
function spawnHeal () {
    healthPickup = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f . f f f f f . . 
        . . f f 3 3 3 f f f 3 3 3 f f . 
        . . f 3 3 3 3 3 f 3 3 3 3 3 f . 
        . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
        . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
        . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
        . . f f 3 3 3 b b b 3 3 3 f f . 
        . . . f f 3 b b b b b 3 f f . . 
        . . . . f f b b b b b f f . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    while (Math.percentChance(20)) {
        tiles.placeOnRandomTile(healthPickup, sprites.dungeon.darkGroundCenter)
    }
}
function nextWave () {
    if (j == 0) {
        spawnEnemy()
        wave += 1
        textSprite.setText("Wave " + wave)
        spawnHeal()
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(list[1])
    direction = 1
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    if (canBeHit) {
        info.changeLifeBy(-1)
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
        canBeHit = false
        pause(200)
        canBeHit = true
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(list[2])
    direction = 2
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    sprites.destroy(otherSprite, effects.hearts, 500)
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.UntilDone)
})
function spawnEnemy () {
    for (let index = 0; index < wave * 2; index++) {
        mySprite2 = sprites.create(img`
            ........................
            ........................
            ........................
            ...........ccc..........
            ...........cccc.........
            .......ccc..ccccccc.....
            .......cccccc555555cc...
            ........ccb5555555555c..
            .....cc..b555555555555c.
            .....cccb55555bcc555555c
            ......cb555555555c55d55c
            ......b5555555555555555c
            ...cc.b555dd5555bb1bbbc.
            ....ccd55ddddd5bbbb335c.
            ...ccbdddddddd5bbbb335c.
            .ccccddddddddd55bbb335c.
            cdcccdddddb55bb5bb3335c.
            cddbddddddb555bb5b3335c.
            cddddddddddb5555b53335c.
            ccddddddbd55bb55c5555c..
            .ccddddbbbdd55cccbccc...
            ...ccbbbcbddddccdddc....
            .....ccccdd555dccccc....
            ........cccccccc........
            `, SpriteKind.Enemy)
        mySprite2.follow(mySprite, 50)
        tiles.placeOnRandomTile(mySprite2, sprites.dungeon.darkGroundCenter)
        j += 1
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.fire, 200)
    info.changeScoreBy(100)
    j += 0 - 1
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.UntilDone)
})
let flippedImage2: Image = null
let flippedImage: Image = null
let dy = 0
let dx2 = 0
let projectile: Sprite = null
let mySprite2: Sprite = null
let healthPickup: Sprite = null
let direction = 0
let canBeHit = false
let j = 0
let wave = 0
let textSprite: TextSprite = null
let list: Image[] = []
let mySprite: Sprite = null
let directionEnemy = 0
let dx = 0
let position = 0
let listEnemy = [img`
    . . . . . . . . . . . . . . . . 
    . . . . c c c c . . . . . . . . 
    . . c c 5 5 5 5 c c . . . . . . 
    . c 5 5 5 5 5 5 5 5 c . . . . . 
    c 5 5 5 5 5 1 f 5 5 5 c . . . . 
    c 5 5 5 5 5 f f 5 5 5 5 c . . . 
    c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
    c c b b 1 b 5 5 5 5 5 5 d c . . 
    c 5 3 3 3 5 5 5 5 5 d d d c . . 
    . b 5 5 5 5 5 5 5 5 d d d c . . 
    . . c b b c 5 5 b d d d d c c . 
    . c b b c 5 5 b b d d d d c d c 
    . c c c c c c d d d d d d d d c 
    . . . c c c c d 5 5 b d d d c . 
    . . c c c c c b 5 5 b c c c . . 
    . . c b b b c d 5 5 b c . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . c c c c . . . . 
    . . . . . . c c 5 5 5 5 c c . . 
    . . . . . c 5 5 5 5 5 5 5 5 c . 
    . . . . c 5 5 5 f 1 5 5 5 5 5 c 
    . . . c 5 5 5 5 f f 5 5 5 5 5 c 
    . . . c 5 5 5 5 5 5 5 5 5 5 5 c 
    . . c d 5 5 5 5 5 5 b 1 b b c c 
    . . c d d d 5 5 5 5 5 3 3 3 5 c 
    . . c d d d 5 5 5 5 5 5 5 5 b . 
    . c c d d d d b 5 5 c b b c . . 
    c d c d d d d b b 5 5 c b b c . 
    c d d d d d d d d c c c c c c . 
    . c d d d b 5 5 d c c c c . . . 
    . . c c c b 5 5 b c c c c c . . 
    . . . . c b 5 5 d c b b b c . . 
    `]
mySprite = sprites.create(img`
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c 4 4 c c c c f . 
    . f f c c 4 4 4 4 c c f f . 
    . f f f b f 4 4 f b f f f . 
    . f f 4 1 f d d f 1 4 f f . 
    . . f f d d d d d d f f . . 
    . . e f e 4 4 4 4 e f e . . 
    . e 4 f b 3 3 3 3 b f 4 e . 
    . 4 d f 3 3 3 3 3 3 c d 4 . 
    . 4 4 f 6 6 6 6 6 6 f 4 4 . 
    . . . . f f f f f f . . . . 
    . . . . f f . . f f . . . . 
    `, SpriteKind.Player)
list = [
assets.image`n`,
assets.image`p`,
assets.image`d`,
assets.image`l`
]
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
info.setScore(0)
info.setLife(3)
textSprite = textsprite.create("Wave 1", 1, 3)
wave = 1
j = 0
canBeHit = true
controller.moveSprite(mySprite)
spawnEnemy()
game.onUpdateInterval(1, function () {
    textSprite.setPosition(scene.cameraProperty(CameraProperty.X) - 0, scene.cameraProperty(CameraProperty.Y) - 53)
})
game.onUpdateInterval(100, function () {
    nextWave()
    if (direction == 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 0, -120)
        projectile.setFlag(SpriteFlag.AutoDestroy, true)
    } else if (direction == 1) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 120, 0)
        projectile.setFlag(SpriteFlag.AutoDestroy, true)
    } else if (direction == 2) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 0, 120)
        projectile.setFlag(SpriteFlag.AutoDestroy, true)
    } else if (direction == 3) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, -120, 0)
        projectile.setFlag(SpriteFlag.AutoDestroy, true)
    }
    for (let e of sprites.allOfKind(SpriteKind.Enemy)) {
        dx2 = mySprite.x - e.x
        dy = mySprite.y - e.y
        if (Math.abs(dx2) > Math.abs(dy)) {
            if (dx2 < 0) {
                // Create a flipped image from the original left-facing image
                flippedImage = listEnemy[0]
                e.setImage(flippedImage)
            } else {
                e.setImage(listEnemy[1])
            }
        } else {
            // fallback - face right or left depending on dx sign
            if (dx2 < 0) {
                flippedImage2 = listEnemy[0]
                e.setImage(flippedImage2)
            } else {
                e.setImage(listEnemy[1])
            }
        }
    }
})
