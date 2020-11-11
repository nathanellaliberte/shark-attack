sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    sprite.setVelocity(-50, 0)
    sprite.setFlag(SpriteFlag.StayInScreen, false)
    if (Math.percentChance(50)) {
        sprite.setImage(img`
            . . . . . . . . . . . c c . . . 
            . . . . . . . c c c c 6 3 c . . 
            . . . . . . c 6 3 3 3 3 6 c . . 
            . . c c . c 6 c c 3 3 3 3 3 c . 
            . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 3 3 3 3 3 c 
            . f f 5 c 6 c 5 f f 6 3 3 3 c c 
            . b 5 5 3 c 3 5 5 c 6 6 6 6 c c 
            . . b 5 5 3 5 5 c 3 3 3 3 3 3 c 
            . . c 5 5 5 5 b c c 3 3 3 3 3 c 
            . . c 4 5 5 4 b 5 5 c 3 3 3 c . 
            . c 5 b 4 4 b b 5 c c b b b . . 
            . c 4 4 b 5 5 5 4 c 4 4 4 5 b . 
            . c 5 4 c 5 5 5 c 4 4 4 c 5 c . 
            . c 5 c 5 5 5 5 c 4 4 4 c c c . 
            . . c c c c c c c . . . . . . . 
            `)
    } else {
        sprite.setImage(img`
            .................ccfff..............
            ................cddbbf..............
            ...............cddbbf...............
            .........ffffffccbbcf...............
            ......fffbbbbbbbbcccff..............
            .....fbbbbbbbbbbbbbbbcfff......ccccc
            .....bcbbbbbffbcbcbbbbcccff...cdbbbc
            .....bbb1111ffbbcbcbbbcccccffcddbbc.
            .....fb11111111bcbcbbbcccccccbdbbf..
            ......fccc33c11bbbbbbcccccccccbbcf..
            .......fc131cc11bbbbccccccccffbccf..
            ........f33c1111bbbcccccbdbc..fbbcf.
            .........ff1111cbbbfdddddcc....fbbf.
            ...........ccc1fbdbbfddcc.......fbbf
            ..............ccfbdbbfc..........fff
            .................fffff..............
            `)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . 6 6 6 5 5 6 6 6 . . . . 
        . . . 7 7 7 7 6 6 6 6 6 6 . . . 
        . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
        . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
        . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
        . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
        . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
        . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
        . . . 6 8 8 8 8 8 8 8 8 6 . . . 
        . . . . 6 6 8 8 8 8 6 6 . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, sprite, 50, 50)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeScoreBy(1)
    sprite.startEffect(effects.bubbles)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    music.powerDown.play()
})
let enemy_sprite: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
let sprite: Sprite = null
scene.setBackgroundColor(8)
sprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b 5 5 b . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 b . 
    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
controller.moveSprite(sprite)
info.setLife(3)
sprite.setFlag(SpriteFlag.StayInScreen, false)
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999799999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999799999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999979999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999997999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999799999d99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999979999dd999999d9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999997999ddd99999d999999999999d999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999979ddddd9999dd9999999999ddd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999997ddddddd999dd9999999999ddd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999979dddd999ddd999999999ddddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999997ddddd999dddd99999999dddddd999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999d7ddddd999dd9999999999dddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999997ddd9dd99ddd9999999dddddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999d7dddd999ddd999999999dddddd999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999dd7ddddd99dddd9999999ddddd9dd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999997dddddddddddd999999ddddddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999997dddddddddddddddddd99dddddd999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999d9999999999d7ddddddddddddddddddd99dddddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999d999999999999999999
    999999999999ddd99999999779ddddddddddddddddddddddd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999d9999dd999999999999999999
    999999999999dd9999999979dddddddddddddddddddddddddd9999999999999999999999999999999999d99999999999999999999999999999999999999999999999999dd999dd999999999999999999
    99999999999ddd999999979ddddddddddddddd7dddddddddddd999999999999999999999999999999999dd9999999999999999999999999999999999999999999999999dd99ddd999999999999999999
    9999999999ddddd999977ddddddddddddddddd7ddddddddddddd99999999999999999999999999999999dd99999999999999999999999999999999999999999999d999dddd9ddddd9999999999999999
    99999999999ddd99977ddddddddddddddddddd7dddddddddddddd999999999999999999999999999999dddd999999999999999999999999999999999999999999ddd99dddd99dd999999999999999999
    999999999999ddd779dddddddddddddddddddd7ddddddddddddddd99999999999999999999999999999dddd9999d9999999999999999999999999999999999999ddd999dd99dddddd999999999999999
    9999999999dddd79dddddddddddddddddddddd7dddddddddddddddd999999999999999999999dd999999dd99999d999999999999999999999999999999999999dddd9ddddddddd999999999d99999999
    99999999999ddd7dddddddddddddddddddddd77ddddddddddddddddd9999999999999999999ddd9999dddddd999dd9999999999999999999999999999999999999ddd9dddd999dd99999999d99999999
    999999999999d7dddddddddddddddddddddd7dddddddddddddddddddd99999999999999999dddd99999dddd9999dd999999999999999999999999999999999999ddd99ddddd99d99999999dddd999999
    999999999999d7dddddddddddddddddddddd7dddddddddddddddd7dddd999999999999999999ddd9999ddddd99ddd9999999999999d99999999999999999999ddddddddddddd9d999999999d99999999
    99999999999dd7ddddddddddddddddddddd7ddddddddddddddddd7dddd9999999999999999dddddd9dddddddd9dddd99999999999dd999999999999999999999ddddddddddddddddd9999dddd9999999
    9999999999ddd7dddddddddddddddddddd7ddddddddddddddddddd7dddd99999999999999dddddd9dddddddddd9dd999999999999ddd9999999999999d99999ddddd99ddddddddddddd999ddd9999999
    99999999ddddd7dddddddddddddddddddd7dddddddddddddddddddd7dddd999999999999999dddddd99dddd9999ddd9999999999ddddd999999999999d9999dddddddddddddddddddddd997dddd99999
    9999999dddddd7dddddddddddddddddddd7dddddddddddddddddddd7ddddd9999999999999dddddd99dddddd99ddd9999999999ddddddd99999999999dd99999ddddddddddddddddddddd77ddd999999
    999999dddddddd7dddddddddddddddddd7dddddddddddddddddddddd7ddddd99999999999ddddd7ddddddddddddddddd9999999d9dddd999999999999dd9999dddddddddddddddddddd77dddd9999999
    99999ddddddddd7dddddddddddddddddd7ddddddddddddddddddddddd7ddddd9999999999999dd7dddddddddddddddddddd99999ddddd99999999999ddd9999ddddddddddddddddddd7dddddd9999999
    999ddddddddddd7dddddddddddddddddd7ddddddddddddddddddddddd7dddddd99999999999ddd7dddddddddddddddddddddd99ddddddd99999999999d9999dddddddddddddddddd77dddddddd999999
    99ddddddddddddd7ddddddddddddddddd7dddddddddddddddddddddddd7dddddd99999999ddddd7dddddddddddddddddddddddd9dddd9d9999999999dddd99ddddddddddddddd777dddddddddddd9999
    9dddddddddddddd7ddddddddddddddddd7dddddddddddddddddddddddd7dddddddd99999dddddd7dddddddddddddddddddddddddddddd999999999999dd99ddddddddddddd777ddddddddddddddddd99
    ddddddddddddddd7ddddddddddddddddd7ddddddddddddddddddddddddd7dddddddd999ddddddd7ddddddddddddddddddddddddddddddd999999999dddddddddddddddd777dddddddddddddddddddddd
    dddddddddddddddd7dddddddddddddddd7ddddddddddddddddddddddddd7ddddddddddddddddddd7dddddddddddddddddddddddddddddd9999999999ddddddddddddd77ddddddddddddddddddddddddd
    ddddddddddddddddd7ddddddddddddddd7ddddddddddddddddddddddddd7ddddddddddddddddddd7dddddddddddddddddd7dddddddddddd9999999999dddddddddd77ddddddddddddddddddddddddddd
    ddddddddddddddddd7dddddddddddddddd7dddddddddddddddddddddddd7dddddddddddddddddddd7ddddddddddddddddd7ddddddddddddd9999999dddddddddd77ddddddddddddddddddddddddddddd
    dddddddddddddddddd7ddddddddddddddd7dddddddddddddddddddddddd7ddddddddddddddddddddd7ddddddddddddddddd7dddddddddddddd9999dddddddddd7ddddddddddddddddddddddddddddddd
    dddddddddddddddddd7dddddddddddddddd7ddddddddddddddddddddddd7ddddddddddddddddddddd7ddddddddddddddddd7ddddddddddddddddddddddddddd7dddddddddddddddddddddddddddddddd
    ddddddddddddddddddd7dddddddddddddddd7ddddddddddddddddddddd7dddddddddddddddddddddd7ddddddddddddddddd7ddddddddddddddddddddddddd77ddddddddddddddddddddddddddddddddd
    dddddddddddddddddddd7dddddddddddddddd7ddddddddddddddddddd7dddddddddddddddddddddddd7dddddddddddddddd7dddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddd7ddddddddddddddd7dddddddddddddddddd7ddddddddddddddddddddddddd7dddddddddddddddd7ddddddddddddddddddddddd7dddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddd77dddddddddddddd7dddddddddddddddd7ddddddddddddddddddddddddddd7ddddddddddddddd7dddddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddd7dddddddddddddd7dddddddddddddd7dddddddddddddddddddddddddddd7ddddddddddddddd7ddddddddddddddddddddd7dddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddd77ddddddddddddd7ddddddddddddd7dddddddddddddddddddddddddddd7ddddddddddddddd7ddddddddddddddddddddd7dddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddd77ddddddddddd7dddddddddddd7ddddddddddddddddddddddddddddd7ddddddddddddddd7dddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddd7ddddddddddd7ddddddddddd7dddddddddddddddddddddddddddd7dddddddddddddddd7dddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddd7dddddddddd7ddddddddddd7dddddddddddddddddddddddddddd7dddddddddddddddd7dddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddd7dddddddddd7dddddddddd7ddddddddddddddddddddddddddd7dddddddddddddddd7ddddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddd7ddddddddd7ddddddddddd7ddddddddddddddddddddddddd7ddddddddddddddddd7ddddddddddddddddddddd777ddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddd7dddddddd7ddddddddddd7ddddddddddddddddddddddddd7dddddddddddddddd7ddddddddddddddddddddddddd777dddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddd7ddddddd7dddddddddddd7ddddddddddddddddddddddd7dddddddddddddddd7ddddddddddddddddddddddddddddd777ddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddd7ddddddd7dddddddddddd77ddddddddddddddddddddd7ddddddddddddddddd7dddddddddddddddddddddddddddddddd777dddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddd7ddddddd7dddddddddddddd7dddddddddddddddddddd7ddddddddddddddddd7ddddddddddddddddddddddddddddddddddd77dddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddd7ddddddd7ddddddddddddddd7dddddddddddddddddd7dddddddddddddddddd7ddddddddddddddddddddddddddddddddddddd77dddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddd7dddddd7ddddddddddddddddd7dddddddddddddddd7dddddddddddddddddd7dddddddddddddddddddddddddddddddddddddddd7ddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddd7dddddd7dddddddddddddddddd7dddddddddddddd7ddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddddd7dddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddd7ddddd7dddddddddddddddddddd7ddddddddddddd7ddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddddd7dddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddd7dddddd7ddddddddddddddddddddd7dddddddddddd7ddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddddd7dddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddd7dddddd7dddddddddddddddddddddd7dddddddddd7ddddddddddddddddddddd7dddddddddddddddddddddddddddddddddddddddd7dddddddddddddddddddddd
    ddddddddddddddddddddddddddddddd77dddddd7dddddddddddddddddddddddd7ddddddddd7dddddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddd7dddddddddddddddddddddd
    ddddddddddddddddddddddddddddd77ddddddd7ddddddddddddddddddddddddd7ddddddddd7ddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddd7ddddddddddddddddddddddd
    ddddddddddddddddddddddddddd77dddddddd7dddddddddddddddddddddddddd7ddddddddd7ddddddddddddddddddddddd7dddddddddddddddddddddddddddddddddddd7dddddddddddddddddddddddd
    ddddddddddddddddddddddddd77ddddddddd7ddddddddddddddddddddddddddd7ddddddddd7ddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddddd7ddddddddddddddddddddddddd
    dddddddddddddddddddddddd7dddddddddd7dddddddddddddddddddddddddddd7ddddddddd7dddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddd7dddddddddddddddddddddddddd
    dddddddddddddddddddddd77dddddddddd7ddddddddddddddddddddddddddddd7ddddddddd7dddddddddddddddddddddddd7dddddddddddddddddddddddddddddddd7ddddddddddddddddddddddddddd
    dddddddddddddddddddd77ddddddddddd7ddddddddddddddddddddddddddddd7ddddddddddd7dddddddddddddddddddddddd7dddddddddddddddddddddddddddddd7dddddddddddddddddddddddddddd
    ddddddddddddddddd777dddddddddddd7dddddddddddddddddddddddddddddd7ddddddddddd7ddddddddddddddddddddddddd7ddddddddddddddddddddddddddddd7dddddddddddddddddddddddddddd
    ddddddddddddddd77dddddddddddddd7dddddddddddddddddddddddddddddd7dddddddddddd7ddddddddddddddddddddddddd7dddddddddddddddddddddddddddd7ddddddddddddddddddddddddddddd
    dddddddddddddd7ddddddddddddddd7dddddddddddddddddddddddddddddd7dddddddddddddd77dddddddddddddddddddddddd7dddddddddddddddddddddddddd7dddddddddddddddddddddddddddddd
    dddddddddddd77ddddddddddddddd7dddddddddddddddddddddddddddddd7ddddddddddddddddd777ddddddddddddddddddddd7ddddddddddddddddddddddddd7ddddddddddddddddddddddddddddddd
    ddddddddddd7dddddddddddddddd7dddddddddddddddddddddddddddddd7ddddddddddddddddddddd77ddddddddddddddddddd7dddddddddddddddddddddddd7dddddddddddddddddddddddddddddddd
    dddddddddd7ddddddddddddddddd7ddddddddddddddddddddddddddddd7dddddddddddddddddddddddd77ddddddddddddddddd7ddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddd
    ddddddddd7dddddddddddddddddd7dddddddddddddddddddddddddddd7ddddddddddddddddddddddddddd7dddddddddddddddd7ddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddd
    dddddddd7ddddddddddddddddddd7dddddddddddddddddddddddddd77ddddddddddddddddddddddddddddd7ddddddddddddddd7ddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddd
    dddddddd7ddddddddddddddddddd7ddddddddddddddddddddddddd7ddddddddddddddddddddddddddddddd7ddddddddddddddd7ddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddd
    dddddddd7ddddddddddddddddddd7dddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddd7ddddddddddddd7dddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddd
    dddddddd7ddddddddddddddddddd7ddddddddddddddddddddddd7dddddddddddddddddddddddddddddddddd7ddddddddddddd7dddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddd
    dddddddd7ddddddddddddddddddd7dddddddddddddddddddddd7dddddddddddddddddddddddddddddddddd7dddddddddddddd7ddddddddddddddddddddddddd7dddddddddddddddddddddddddddddddd
    ddddddddd7dddddddddddddddddd7dddddddddddddddddddddd7dddddddddddddddddddddddddddddddddd7ddddddddddddd7dddddddddddddddddddddddddd7dddddddddddddddddddddddddddddddd
    ddddddddd7dddddddddddddddddd7dddddddddddddddddddddd7ddddddddddddddddddddddddddddddddd7dddddddddddddd7ddddddddddddddddddddddddddd77dddddddddddddddddddddddddddddd
    dddddddddd7dddddddddddddddddd7dddddddddddddddddddd7dddddddddddddddddddddddddddddddddd7ddddddddddddd7dddddddddddddddddddddddddddddd7ddddddddddddddddddddddddddddd
    dddddddddd7dddddddddddddddddd7ddddddddddddddddddddd7dddddddddddddddddddddddddddddddd7ddddddddddddd7dddddddddddddddddddddddddddddddd77ddddddddddddddddddddddddddd
    ddddddddddd7ddddddddddddddddd7ddddddddddddddddddddd7dddddddddddddddddddddddddddddddd7dddddddddddd7ddddddddddddddddddddddddddddddddddd7dddddddddddddddddddddddddd
    dddddddddddd7ddddddddddddddddd7dddddddddddddddddddd7ddddddddddddddddddddddddddddddd7dddddddddddd7ddddddddddddddddddddddddddddddddddddd7ddddddddddddddddddddddddd
    dddddddddddd77dddddddddddddddd7dddddddddddddddddddd7dddddddddddddddddddddddddddddd7dddddddddddddddddddddddddddddddddddddddddddddddddddd77ddddddddddddddddddddddd
    dddddddddddddd7dddddddddddddddd7ddddddddddddddddddd7ddddddddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddddddddddddddddddd77ddddddddddddddddddddd
    dddddddddddddd7dddddddddddddddd7dddddddddddddddddddd7dddddddddddddddddddddddddd77dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd7dddddddddddddddddddd
    dddddddddddddd7dddddddddddddddd7dddddddddddddddddddddddddddddddddddddddddddddd7ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    `)
for (let index = 0; index <= 10; index++) {
    mySprite = sprites.create(img`
        . . 6 7 7 8 . . 
        . 6 7 7 8 . . . 
        . 8 7 8 . . 6 8 
        . 8 7 8 . 6 6 8 
        . . 8 6 8 8 8 . 
        . . . 8 6 8 . . 
        6 6 . . 8 7 8 . 
        8 6 6 8 7 7 8 . 
        . 8 8 7 7 8 . . 
        . 8 7 7 8 . . . 
        . 8 7 8 . 8 6 . 
        . 8 7 8 . 8 6 6 
        . . 8 6 8 . 8 8 
        . . . 8 6 8 . . 
        . . . . 8 7 8 . 
        . . . 6 7 7 8 . 
        `, SpriteKind.Food)
    mySprite.setPosition(16 * index, 96)
}
info.startCountdown(60)
game.onUpdateInterval(500, function () {
    enemy_sprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . c c . . . 
        . . . . . . . c c c c 6 3 c . . 
        . . . . . . c 6 3 3 3 3 6 c . . 
        . . . . . c 6 6 3 3 3 3 3 3 c . 
        . . . . c 6 6 6 6 3 3 3 3 3 3 c 
        . c c c c c 6 6 c c 3 3 3 3 3 c 
        b 5 5 c 3 3 c c 5 5 c 3 3 3 c c 
        f f 5 c c c 3 c 5 f f 6 6 6 c c 
        f f 5 c c c c c 5 f f 3 3 3 3 c 
        . b 5 5 3 c 3 5 5 c 3 3 3 3 3 c 
        . c 4 4 5 5 5 5 4 c c 3 3 3 c . 
        c 4 5 5 4 4 4 4 5 5 4 c b b . . 
        c 5 5 5 c 4 c 5 5 5 c 4 c 5 c . 
        c 5 5 5 5 c 5 5 5 5 c 4 c 5 c . 
        . c c c c c c c c c . . c c c . 
        `, SpriteKind.Enemy)
    enemy_sprite.setPosition(randint(0, 160), randint(0, 120))
})
