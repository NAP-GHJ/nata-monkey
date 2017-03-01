import {exec} from 'child_process'
import Input from './Input.js'
import Result from './Result.js'
import fs from 'fs'

class MonkeyRunner{
  constructor(deviceId,command){
    /*Monkey的配置运行数据
        deviceId:设备信息
        command:运行参数
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



  getRunner(){
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

	getResult(_result){
     this.result = _result
	   this.resultAnalyse = new Result(this.result).analysis()
       return this.resultAnalyse
	}

	async checkInput(){
		const commandInput = new Input(this.deviceId,this.command)
		const command = await commandInput.toString()

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
	monkey(_command){
    this.command = _command;
    console.log(this.command)
		return new Promise((resolve,reject)=>{
			  this.run(this.command).then((data)=>{

				  this.result = data
				  resolve(this.result)
				  
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

    })
  }

}

export default MonkeyRunner;

