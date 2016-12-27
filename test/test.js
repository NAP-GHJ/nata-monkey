import MonkeyRunner from '../src/index.js';

const deviceId = 'd53ef30';
//const deviceId = '4387cae1';
const cmd = '-v 10000';

const monkey = new MonkeyRunner(deviceId,cmd);

monkey.checkInput().then(command=>{
	console.log(command)
	if(command === false)
		return;
	console.log('Hello')
	monkey.monkey().then(result=>{
		//console.log(result)
		const resultAnalyse = monkey.getResult()

		console.log(resultAnalyse)
	},err=>{
		console.log('Err')
	})

	const stdout = monkey.getStdout()

	if(stdout){
	    stdout.on('data',(data)=>{
	        //console.log(data)
	    })
	}
})

//console.log(check)

//monkey.monkey()

// .then(()=>{
// 		console.log('Hello Then')
// 		const result = monkey.getResult()
// 		//console.log(result)
// 		console.log('结果输出完整')
// 	},err=>{
// 		console.log(err)
// 	})

// const runner = monkey.getRunner();
// const stdout = monkey.getStdout()
// const stderr = monkey.getStderr();
//
// console.log('runner '+runner)
//
// if(stderr){
//     stderr.on('data',(data)=>{
//         console.log(data)
//     })
// }
//
// if(stdout){
//     stdout.on('data',(data)=>{
//         console.log(data)
//     })
// }
//
// if(runner){
//     runner.on('close',(code)=>{
//         console.log('closing code'+code)
// 		console.log(stdout)
//     })
// }
