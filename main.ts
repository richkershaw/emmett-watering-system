let wetness = 0
let dryness = 0
let sensor_reading = 0
makerbit.connectLcd(39)
let wet = 300
let dry = 700
let dryness_trigger_level = 20
makerbit.lcdMakeCharacter(LcdChar.c1, makerbit.lcdCharacterPixels(`
    . # # # .
    # # # # #
    . # # # .
    . . # . .
    . . # . .
    # # # # #
    # # # # #
    . # # # .
    `))
makerbit.lcdMakeCharacter(LcdChar.c2, makerbit.lcdCharacterPixels(`
    . . . . .
    . . . . #
    . . . # .
    # . # . .
    . # . . .
    . . . . .
    . . . . .
    . . . . .
    `))
makerbit.lcdMakeCharacter(LcdChar.c3, makerbit.lcdCharacterPixels(`
    . . # . .
    . # # # .
    . # # # .
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    . # # # .
    `))
makerbit.lcdMakeCharacter(LcdChar.c4, makerbit.lcdCharacterPixels(`
    . . . . .
    . # # # .
    # . # . #
    # . # . #
    # . . . #
    . # # # .
    . . . . .
    . . . . .
    `))
makerbit.lcdMakeCharacter(LcdChar.c5, makerbit.lcdCharacterPixels(`
    . . . . .
    . . . # #
    . . # . .
    . # . . .
    . # . . .
    . # . . .
    . . # . .
    . . . # #
    `))
makerbit.lcdMakeCharacter(LcdChar.c6, makerbit.lcdCharacterPixels(`
    . . . . .
    # # # . .
    # . . # .
    # . . . #
    # # # . .
    . . . . #
    . . . # .
    # # # . .
    `))
loops.everyInterval(3000, function () {
    sensor_reading = pins.analogReadPin(AnalogPin.P0)
    dryness = Math.map(sensor_reading, wet, dry, 1, 99)
    wetness = 100 - Math.round(dryness)
    makerbit.clearLcd1602()
    makerbit.showStringOnLcd1602("Emmett's Waterer", makerbit.position1602(LcdPosition1602.Pos1), 16)
    makerbit.showStringOnLcd1602("%", makerbit.position1602(LcdPosition1602.Pos19), 1)
    makerbit.lcdShowCharacter1602(LcdChar.c3, makerbit.position1602(LcdPosition1602.Pos21))
    makerbit.showStringOnLcd1602(convertToText(wetness), makerbit.position1602(LcdPosition1602.Pos17), 2)
    if (wetness <= dryness_trigger_level) {
        makerbit.showStringOnLcd1602("Water", makerbit.position1602(LcdPosition1602.Pos25), 6)
        makerbit.lcdShowCharacter1602(LcdChar.c3, makerbit.position1602(LcdPosition1602.Pos31))
        makerbit.lcdShowCharacter1602(LcdChar.c4, makerbit.position1602(LcdPosition1602.Pos32))
        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.pause(10000)
        pins.digitalWritePin(DigitalPin.P8, 0)
        makerbit.showStringOnLcd1602("Soak  ", makerbit.position1602(LcdPosition1602.Pos25), 6)
        makerbit.lcdShowCharacter1602(LcdChar.c5, makerbit.position1602(LcdPosition1602.Pos31))
        makerbit.lcdShowCharacter1602(LcdChar.c6, makerbit.position1602(LcdPosition1602.Pos32))
        basic.pause(10000)
    } else {
        pins.digitalWritePin(DigitalPin.P8, 0)
        makerbit.showStringOnLcd1602("Good!   ", makerbit.position1602(LcdPosition1602.Pos25), 6)
        makerbit.lcdShowCharacter1602(LcdChar.c1, makerbit.position1602(LcdPosition1602.Pos31))
        makerbit.lcdShowCharacter1602(LcdChar.c2, makerbit.position1602(LcdPosition1602.Pos32))
    }
})
