class Input{
  constructor(deviceId,command,path){
    this.deviceId = deviceId;
    this.command = command;
  }

  toString(){
    return `adb -s ${this.deviceId} shell monkey ${this.command}`;
  }

}


export default Input;
