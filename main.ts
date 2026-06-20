let dryness = 0
let sensor_reading = 0
OLED.init(128, 64)
let wet = 300
let dry = 700
let dryness_trigger_level = 80
loops.everyInterval(3000, function on_every_interval() {
    
    sensor_reading = pins.analogReadPin(AnalogPin.P0)
    dryness = Math.map(sensor_reading, wet, dry, 0, 100)
    OLED.clear()
    OLED.writeStringNewLine("Emmett's watering kit")
    OLED.writeString("Dryness: ")
    OLED.writeNum(dryness)
    OLED.writeStringNewLine(" / 100")
    if (dryness >= dryness_trigger_level) {
        OLED.writeStringNewLine("Watering...")
        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.pause(10000)
        pins.digitalWritePin(DigitalPin.P8, 0)
        OLED.writeStringNewLine("Waiting to soak...")
        basic.pause(10000)
    } else {
        pins.digitalWritePin(DigitalPin.P8, 0)
        OLED.writeStringNewLine("Soil is damp and healthy!")
    }
    
})
