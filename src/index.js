import {exec} from 'child_process'
import Input from './Input.js'
import fs from 'fs'

class MonkeyRunner{
  constructor(deviceId,command,path){
    /*Monkey的配置运行数据
    deviceId:设备信息
    command:运行参数
    path：路径信息
    */
    this.deviceId = deviceId;
    this.command = command;
    this.path = path;
    this.screenshot = path;

    /*处理Monkey运行的数据流*/
    this.runner = undefined;
    this.stdout = undefined;
    this.stderr = undefined;
    this.stdin = undefined;
  }

  // get runner(){
  //   return this.runner;
  // } 

  // set runner(runner){
  //   this.runner = runner;
  // }

  // get stdout(){
  //   return this.stdout;
  // }

  // set stdout(stdout){
  //   this.stdout = stdout;
  // }

  // get stderr(){
  //   return this.stderr;
  // }

  // set stderr(stderr){
  //   this.stderr = stderr;
  // }

  // get stdin(){
  //   return this.stdin;
  // }

  // set stdin(stdin){
  //   this.stdin = stdin;
  // }
  getRunner(){
    if(this.runner != undefined)
      return this.runner;
  }
  getStdin(){
    return this.stdin;
  }

  getStderr(){
    return this.stderr;
  }
  getStdout(){
    return this.stdout
  } 
  /**
  * run shell command and get the output
  * @param  {String} cmd to run
  * @return {Promise} stdout || stderr
  */
  monkey(){
    /*生成运行Monkey的命令*/
    const command = new Input(this.deviceId,this.command,this.path).toString();

    console.log(command);

    this.run(command).then((data)=>{
      console.log("执行结束");

      /*将Monkey的运行结果写到文件中*/
      console.log("准备写入文件");
      fs.writeFile(`${this.path}.txt`,data,function(err){
        if(err){
          console.log("Monkey写文件Error")
        }
      })
      console.log("写入文件完成")
    },(err)=>{
      console.log("执行错误"+err);
    }).then(()=>{
      console.log("截图开始")
      setTimeout(()=>{
        exec(`adb -s ${this.deviceId} shell screencap -p | sed 's/\r$//' > ${this.screenshot}.png`);
      },5000)
    })
  }

  /*run adb shell monkey*/
  run(cmd) {
    return new Promise((resolve, reject) => {
      const runner = exec(cmd, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(stdout || stderr)
        }
      })

      this.runner = runner;
      this.stdin = runner.stdin;
      this.stdout = runner.stdout;
      this.stderr = runner.stderr;
      

      // runner.stdout.on('data',function(data){
      //   console.log(data);
      // })
      //
      // runner.stderr.on('data',function(data){
      //   console.log(data);
      // })
      //
      // runner.on('close', function(code) {
      //   console.log('closing code: ' + code);
      // });
    })
  }

}

export default MonkeyRunner;
