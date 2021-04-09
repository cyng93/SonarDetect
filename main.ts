function 廣播開始抽獎 () {
    if (input.runningTime() - prev_trigger > cooldown_ms) {
        basic.showArrow(ArrowNames.North)
        radio.sendString("go")
    } else {
        music.stopAllSounds()
        soundExpression.sad.play()
    }
    prev_trigger = input.runningTime()
    basic.pause(100)
    basic.clearScreen()
}
let prev_trigger = 0
let cooldown_ms = 0
cooldown_ms = 6000
prev_trigger = 0 - cooldown_ms
let threshold = 8
let distance = 100
let prev_distance = 100
basic.forever(function () {
    radio.setGroup(99)
    distance = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    serial.writeLine("distances: " + convertToText(distance))
    basic.pause(200)
    prev_distance = distance
})
basic.forever(function () {
    if (distance < threshold && prev_distance < threshold) {
        pins.digitalWritePin(DigitalPin.P9, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        soundExpression.hello.play()
        廣播開始抽獎()
    } else {
        pins.digitalWritePin(DigitalPin.P2, 1)
        pins.digitalWritePin(DigitalPin.P9, 0)
    }
})
basic.forever(function () {
    if (input.runningTime() - prev_trigger > cooldown_ms) {
        basic.showIcon(IconNames.Yes)
    } else {
        led.plotBarGraph(
        cooldown_ms - (input.runningTime() - prev_trigger),
        cooldown_ms
        )
    }
})
