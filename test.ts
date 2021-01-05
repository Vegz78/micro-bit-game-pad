// tests go here; this will not be compiled when this package is used as a library
input.onButtonPressed(Button.A, () => {
    bluetooth.pressJoystickButton(JoystickButton.JOYSTICK_BUTTON_1);
    basic.showString("A");
})

// Two input work only with this pxt.json config
// "yotta": {
//     "config": {
//         "microbit-dal": {
//             "bluetooth": {
//                 "dfu_service": 0,
//                 "event_service": 0,
//                 "device_info_service": 0,
//                 "security_level": "SECURITY_MODE_ENCRYPTION_NO_MITM"
//             },
//             "gatt_table_size": "0x700"
//         }
//     }
// }
input.onButtonPressed(Button.B, () => {
    bluetooth.pressJoystickButton(JoystickButton.JOYSTICK_BUTTON_2);
    basic.showString("B");
})


basic.showString("OK")
bluetooth.startJoystickService()

function normalize(v:number, limit:number) {
    // Make range -800 to 800
    const RANGE_MIN = -limit;
    const RANGE_MAX = limit;
    const DEADZONE = 25;
    const SCALING_FACTOR = RANGE_MAX/127

    if (Math.abs(v) < DEADZONE) {
        v = 0;
    } else {
        if (v > 0) {
            v -= DEADZONE;
        } else {
            v += DEADZONE;
        }
    }

    if (v < RANGE_MIN) {
        v = RANGE_MIN;
    }
    if (v > RANGE_MAX) {
        v = RANGE_MAX;
    }

    

    v -= v%10;

    v /= SCALING_FACTOR;
    return Math.floor(v);
    // if (v < -800) {
    //     v = -800;
    // }
    // if (v > 800) {
    //     v = 800;
    // }

    // v /= 6.29;
    // return v;
}

// function movingAverage(average:number, sample:number) {
//     return average - average / 8 + sample / 8;
// }

let xs = 0;
let ys = 0;
let zs = 0;
// let xIndex = 0;
// let yIndex = 0;
// let zIndex = 0;

basic.forever(function () {


    xs = xs - (xs >> 3) + (input.acceleration(Dimension.X) >> 3);
    ys = ys - (ys >> 3) + (input.acceleration(Dimension.Y) >> 3);
    zs = zs - (zs >> 3) + (input.acceleration(Dimension.Z) >> 3);

    xs -= xs%10;
    ys -= ys%10;
    zs -= zs%10;

    
    
    let x = normalize(xs, 550);
    let y = normalize(ys, 10);
    let z = normalize(zs, 350);

    // zs = movingAverage(zs, z);
    // // ys = movingAverage(ys, y);
    // // zs = movingAverage(zs, z);
    // serial.writeLine(z.toString() + "   " + zs.toString());
    serial.writeLine(Math.floor(x).toString() + "," + Math.floor(z).toString() );
    // xs[xIndex] = x;
    // ys[yIndex] = y;
    // zs[zIndex] = z;

    // xIndex = (xIndex + 1);
    // if (xIndex >= 8) {
    //     xIndex = 0;
    // }
    // yIndex = (yIndex + 1) % ys.length;
    // zIndex = (zIndex + 1) % zs.length;

    // let x_average = xs.reduce((a, b) => a + b, 0) / xs.length;
    // let y_average = ys.reduce((a, b) => a + b, 0) / ys.length;
    // let z_average = zs.reduce((a, b) => a + b, 0) / zs.length;

    // bluetooth.sendMovement(x_average, y_average, z_average);
    bluetooth.sendMovement(Math.floor(x), Math.floor(y), Math.floor(z));
    control.waitMicros(4);
}) 