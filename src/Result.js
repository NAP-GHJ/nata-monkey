class Result{
	constructor(result){
		this.result = result

		this.seed = undefined
		this.actionList = []
		this.activityList = []
		this.summaryList = []
	}

	analysis(){
		//console.log('\n'+this.result)
		const array = this.result.split(/\r\n/)
		//console.log(array)
		this.seed = this.getSeed(array[0])
		//console.log(`Analysis: seed is ${this.seed}`)
		array.forEach(element=>{
			if(element.indexOf(':Sending')!= -1){
				const action = this.getAction(element)
				//console.log(`Analysis: action is ${action}`)
				this.actionList.push(action)
				this.summaryList.push(`Action: ${action}`)
			}else if(element.indexOf('// Allowing') != -1){
				const activity = this.getActivity(element)
				//console.log(`Analysis: activity is ${activity}`)
				this.activityList.push(activity)
				this.summaryList.push(`Activity: ${activity}`)
			}
		})
		this.actionList.pop()
		return {seed:this.seed,actionList:this.actionList,activityList:this.activityList,summary:this.summaryList}
	}

	/*获取monkey的随机种子*/
	getSeed(string){
		const array = string.split(/[:\s=]+/)
		const index = array.indexOf('seed')+1
		return array[index]
	}

	/*获取Action*/
	getAction(string){
		return string.substring(9)
	}

	/*获取Activity*/
	getActivity(string){
		const index = string.indexOf('cmp')
		const subString = string.substring(index)
		return subString.split(' ')[0].substring(4)
	}
}

export default Result
