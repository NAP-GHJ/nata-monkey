import {exec} from 'child_process'

class Input{
		constructor(deviceId,command){
				this.deviceId = deviceId;
				this.command = command;
		}

		async toString(){
	  		const check = await this.inputCheck()
	  		if(check){
		  			return `adb -s ${this.deviceId} shell monkey ${this.command}`
	  		}
	  		else return false
		}

		shell(newCommand){
				return new Promise((resolve,reject)=>{
						exec(newCommand,(err,stdout,stderr)=>{
								if (err) reject(err)
								else resolve(stdout || stderr)
						})
				})
		}

	async inputCheck(){
	  	const array = this.command.split(/\s+/)
			let count = array[array.length - 1]
			let count_int = parseInt(count)
			if(isNaN(count_int))
				return false
			else{
					array[array.length - 1] = '1'
					let newCommand = '';
					array.forEach(ele=>{
							newCommand = newCommand+ele+' '
					})

					newCommand = `adb -s ${this.deviceId} shell monkey ${newCommand}`
					console.log(newCommand)
					const runResult = await this.shell(newCommand)
					if(runResult.indexOf("Error") != -1){
							return false
					}
					else {
							return true
					}
			}
	}

}

export default Input;
