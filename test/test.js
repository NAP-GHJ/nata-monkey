import MonkeyRunner from '../src/index.js';
import Input from '../src/Input.js';
import {exec} from 'child_process'


const deviceId = '4387cae1';
const cmd = '-v 100';
const path = '测试计划-测试案例';
const monkey = new MonkeyRunner(deviceId,cmd,path);

monkey.monkey();

const runner = monkey.getRunner();
const stdout = monkey.getStdout();
const stderr = monkey.getStderr();

var result ;

if(stderr){
    stderr.on('data',(data)=>{
        console.log(data)
    })
}

if(stdout){
    stdout.on('data',(data)=>{
        console.log(data)
    })
}

if(runner){
    runner.on('close',(code)=>{
        console.log('closing code'+code)
    })
}
