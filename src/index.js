import {exec} from 'child_process'
import Input from './Input.js'
import Result from './Result.js'
import fs from 'fs'

class MonkeyRunner{
  constructor(deviceId,command){
    /*Monkey的配置运行数据
    deviceId:设备信息
    command:运行参数
    path：路径信息
    */
    this.deviceId = deviceId;
    this.command = command;

    /*处理Monkey运行的数据流*/
    this.runner = undefined;
    this.stdout = undefined;
    this.stderr = undefined;
    this.stdin = undefined;

	/*分析静态结果*/
	this.result = undefined
	this.resultAnalyse = undefined
	// this.seed = undefined
	// this.actionList = []
	// this.activityList = []
	// this.summaryList = []
	// this.exception = undefined

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
	  console.log('Hello2')
	  return this.runner
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

	getResult(){
	   this.resultAnalyse = new Result(this.result).analysis()
	}

	async checkInput(){
		const commandInput = new Input(this.deviceId,this.command)
		const command = await commandInput.toString()
		console.log(command)
		if(command === false){
			return false
		}
		else {
			this.command = command
			return command
		}
	}
	/**
	* run shell command and get the output
	* @param  {String} cmd to run
	* @return {Promise} stdout || stderr
	*/
	monkey(){
		return new Promise((resolve,reject)=>{
			  this.run(this.command).then((data)=>{

				  this.result = data
				  resolve(this.result)
				  //console.log(data)
				  console.log("执行结束")
			  },err=>{
				  reject(err)
			  })
	  })
	}

  /*run adb shell monkey*/
  run(cmd) {
    return new Promise((resolve, reject) => {
      this.runner = exec(cmd, {maxBuffer:2000*1024},(err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(stdout || stderr)
        }
      })

	  this.stdin = this.runner.stdin;
	  this.stdout = this.runner.stdout;
	  this.stderr = this.runner.stderr;
	  console.log('Hello1')
    })
  }

}

export default MonkeyRunner;


//   this.runner.stdout.on('data',function(data){
//     console.log(data);
//   })
  //
  // runner.stderr.on('data',function(data){
  //   console.log(data);
  // })
  //
  // runner.on('close', function(code) {
  //   console.log('closing code: ' + code);
  // });



  //
  //  	/*将Monkey的运行结果写到文件中*/
  //  	console.log("准备写入文件");
  //  	fs.writeFile(`${this.path}.txt`,data,function(err){
  // 	if(err){
  //   		console.log("Monkey写文件Error")
  // 	}
  //  	})
  //  	console.log("写入文件完成")
  // },(err)=>{
  //  		console.log("执行错误"+err);
  // }).then(()=>{
  //  		console.log("截图开始")
  //  		setTimeout(()=>{
  // 	exec(`adb -s ${this.deviceId} shell screencap -p | sed 's/\r$//' > ${this.screenshot}.png`);
  //  	},5000)
