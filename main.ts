music.setVolume(12)
let threshold = 8
let distances = 100
let prev_distances = 100
basic.forever(function () {
    distances = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    serial.writeLine("distances: " + convertToText(distances))
    basic.pause(500)
})
basic.forever(function () {
    if (distances < threshold && prev_distances < threshold) {
        pins.digitalWritePin(DigitalPin.P9, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        soundExpression.sad.play()
    } else {
        pins.digitalWritePin(DigitalPin.P9, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
    prev_distances = distances
})
