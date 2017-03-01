import MonkeyRunner from '../';

describe('Test monkey', () => {
	
	const deviceId = 'ZTEBV0730';
	const cmd = '-v 100';
	let command,result;
	let monkey;

	before(()=>{
		monkey = new MonkeyRunner(deviceId,cmd)
	})

	it('check input', function(done) {
		monkey.checkInput().then(_command=>{
			command = _command;	
			done()
		})
	})

	it('run monkey',function(done){
		if(command !== false){
			monkey.monkey(command).then(_result => {
				// console.log(result)
				result = _result;
				done();
			})

			let runner = monkey.getRunner()
			let stdout = monkey.getStdout()

			if(stdout){
    			stdout.on('data',(data)=>{
        		//console.log(data)
    			})
			}

			if(runner){
				runner.on('close',(code)=>{
					//console.log('closing code'+code)
				})
			}
		}
	})

	it('analyse result',(done)=>{
		const _result = monkey.getResult(result)
		console.log(_result)	
		done()
	})

})

/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/getOnlineDevices.test.js
 */
