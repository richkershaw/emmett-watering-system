dryness = 0
sensor_reading = 0
OLED.init(128, 64)
wet = 300
dry = 700
dryness_trigger_level = 80

def on_every_interval():
    global sensor_reading, dryness
    sensor_reading = pins.analog_read_pin(AnalogPin.P0)
    dryness = Math.map(sensor_reading, wet, dry, 0, 100)
    OLED.clear()
    OLED.write_string_new_line("Emmett's watering kit")
    OLED.write_string("Dryness: ")
    OLED.write_num(dryness)
    OLED.write_string_new_line(" / 100")
    if dryness >= dryness_trigger_level:
        OLED.write_string_new_line("Watering...")
        pins.digital_write_pin(DigitalPin.P8, 1)
        basic.pause(10000)
        pins.digital_write_pin(DigitalPin.P8, 0)
        OLED.write_string_new_line("Waiting to soak...")
        basic.pause(10000)
    else:
        pins.digital_write_pin(DigitalPin.P8, 0)
        OLED.write_string_new_line("Soil is damp and healthy!")
loops.every_interval(3000, on_every_interval)
