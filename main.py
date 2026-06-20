wetness = 0
dryness = 0
sensor_reading = 0
makerbit.connect_lcd(39)
wet = 300
dry = 700
dryness_trigger_level = 20
makerbit.lcd_make_character(LcdChar.C1,
    makerbit.lcd_character_pixels("""
        . # # # #
        # # # # #
        . . # # .
        . . # # .
        . . # # .
        # # # # #
        # # # # #
        . # # # #
        """))
makerbit.lcd_make_character(LcdChar.C2,
    makerbit.lcd_character_pixels("""
        . . . . .
        # . . . #
        . . . # .
        # . # . .
        . # . . .
        # . . . .
        # . . . .
        . . . . .
        """))
makerbit.lcd_make_character(LcdChar.C3,
    makerbit.lcd_character_pixels("""
        . . . . .
        . . . # #
        . # # # #
        # # # # #
        . # # # #
        . . # . #
        . # . # .
        # . # . #
        """))
makerbit.lcd_make_character(LcdChar.C4,
    makerbit.lcd_character_pixels("""
        . . . . .
        # # . . .
        # # # # .
        # # # # #
        # # # # .
        . # . . .
        # . . . .
        . . . . .
        """))
makerbit.lcd_make_character(LcdChar.C5,
    makerbit.lcd_character_pixels("""
    . . . . .
# . . . .
# # . . .
# # . . .
# # # . .
# # # . .
# # . . .
# . . . .
        """))
makerbit.lcd_make_character(LcdChar.C6,
    makerbit.lcd_character_pixels("""
        . . . . .
        # . . . .
        # # . . .
        # # . . .
        # # # . .
        # # # . .
        # # . . .
        # . . . .
        """))

def on_every_interval():
    global sensor_reading, dryness, wetness
    sensor_reading = pins.analog_read_pin(AnalogPin.P0)
    dryness = Math.map(sensor_reading, wet, dry, 1, 99)
    wetness = 100 - Math.round(dryness)
    makerbit.clear_lcd1602()
    makerbit.show_string_on_lcd1602("Emmett's Waterer",
        makerbit.position1602(LcdPosition1602.POS1),
        16)
    makerbit.show_string_on_lcd1602("% wet", makerbit.position1602(LcdPosition1602.POS19), 6)
    makerbit.show_string_on_lcd1602(convert_to_text(wetness),
        makerbit.position1602(LcdPosition1602.POS17),
        2)
    if wetness <= dryness_trigger_level:
        makerbit.show_string_on_lcd1602("Watering", makerbit.position1602(LcdPosition1602.POS26), 8)
        makerbit.lcd_show_character1602(LcdChar.C3, makerbit.position1602(LcdPosition1602.POS31))
        makerbit.lcd_show_character1602(LcdChar.C4, makerbit.position1602(LcdPosition1602.POS32))
        pins.digital_write_pin(DigitalPin.P8, 1)
        basic.pause(10000)
        pins.digital_write_pin(DigitalPin.P8, 0)
        makerbit.show_string_on_lcd1602("Soaking ", makerbit.position1602(LcdPosition1602.POS26), 8)
        basic.pause(10000)
    else:
        pins.digital_write_pin(DigitalPin.P8, 0)
        makerbit.show_string_on_lcd1602("Good    ", makerbit.position1602(LcdPosition1602.POS26), 8)
        makerbit.lcd_show_character1602(LcdChar.C1, makerbit.position1602(LcdPosition1602.POS31))
        makerbit.lcd_show_character1602(LcdChar.C2, makerbit.position1602(LcdPosition1602.POS32))
loops.every_interval(3000, on_every_interval)
