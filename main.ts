music.setVolume(100)
let threshold = 8
let distances = 100
let prev_distances = 100
basic.forever(function () {
    radio.setGroup(99)
    distances = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    serial.writeLine("distances: " + convertToText(distances))
    basic.pause(100)
    prev_distances = distances
})
basic.forever(function () {
    if (distances < threshold && prev_distances < threshold) {
        pins.digitalWritePin(DigitalPin.P9, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.showArrow(ArrowNames.North)
        soundExpression.hello.play()
        radio.sendString("go")
        basic.clearScreen()
    } else {
        pins.digitalWritePin(DigitalPin.P9, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
})
