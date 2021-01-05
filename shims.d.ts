// Auto-generated. Do not edit.
declare namespace bluetooth {

    /**
     * A function to start bluetooth Joystick service
     */
    //% blockId=bluetooth_startJoystickService block="bluetooth startJoystickService" shim=bluetooth::startJoystickService
    function startJoystickService(): void;

    /**
     * A function to press joystick button
     */
    //% blockId=bluetooth_pressJoystickButton block="bluetooth press joystick button %button" shim=bluetooth::pressJoystickButton
    function pressJoystickButton(button: JoystickButton): void;

    /**
     * A function to sent joystick speed
     */
    //% blockId=bluetooth_sendMovement block="bluetooth send joystick speed %x %y %z" shim=bluetooth::sendMovement
    function sendMovement(x: int32, y: int32, z: int32): void;
}

// Auto-generated. Do not edit. Really.
