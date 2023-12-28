
/**
 * 
 * inquirer @9.0.2
 * colors:@1.4.0
 * progress @2.3.0
 * glob
 * ali-oss
 * 
 * eg:
 * import VitePluginOss from './vitePluginsOss';
 * VitePluginOss({
 *      from:'<文件夹名称>',
 *      ossDist:"/sc/activity_source/xxxx"  //上传到阿里云的文件路径后面不用带斜杠
 * })
 * 
 * tips:需要自己设置base路径为CDN的路径地址
 * */ 

import { Plugin } from 'vite';
import path from 'path';
import {glob} from 'glob';
import Colors from 'colors'
import OSS from 'ali-oss';
import fs from 'fs';
import inquirer from 'inquirer';
import * as progress from 'progress';
const ProgressBar = progress.default;
const {red, blue, green, underline, yellow, white } = Colors;
// TS类型检查 
// OSS 配置
type OSSOptions = {
    region:string,
    bucket:string
}

// 基本配置
type defaultOptions = {
    from:string, //本地上传文件的目录地址
    ossDist?:string, //上传到OSS的目录名称(上传地址)
    deleteOrigin?:boolean, //是否删除源文件
    deleteEmptyDir?:boolean,  //是否删除源文件目录
    timeout?:number //超时时间
}

interface answerProps {
    type:string,
    name:string,
    message:string,
    when?:()=>{}
}

type pluginsOptions = OSSOptions & deefaultOptions;


// 基础配置信息
const defaultOptions:defaultOptions = {
    from:'',
    ossDist:'',
    deleteOrigin:false,
    deleteEmptyDir:false,
}

// 用户通过命令行输入相关信息
const answerArr:answerProps[] = [
    {
        type: 'confirm',
        name: 'uploadCDN',
        message: '检测到打包环境为production,是否部署至cdn??',
    },
    {
        type: 'password',
        name: 'accessKeyId',
        message: '请输入accessKeyId',
        when(answer) {
            return answer.uploadCDN;
        }
    },
    {
        type: 'password',
        name: 'accessKeySecret',
        message: '请输入accessKeySecret',
        when(answer) {
            return answer.uploadCDN;
        }
    },
]

// 上传出现错误重新上传
const reloadAnswerArr = [
    {
        type: 'confirm',
        name: 'uploadCDN',
        message: '上传错误${errArr.length}个,是否重新上传',
    },
    {
        type: 'confirm',
        name: 'LasttimeConfig',
        message: '是否使用原有,accessKeyI,accessKeySecret',
        when(answer) {
            return answer.uploadCDN;
        }
    },
    {
        type: 'password',
        name: 'accessKeyId',
        message: '请输入accessKeyId',
        when(answer) {
            return !answer.LasttimeConfig && answer.uploadCDN;
        }
    },
    {
        type: 'password',
        name: 'accessKeySecret',
        message: '请输入accessKeySecret',
        when(answer) {
            return !answer.LasttimeConfig && answer.uploadCDN;
        }
    },
]


const answerFn = function(arr){
    return inquirer.prompt(arr);
}

const assetUploadAliOssPlugins = (options:pluginsOptions):Plugin=>{
    // OSS key && pass 需要使用命令行手动输入
    const {
        from,
        ossDist,
        deleteOrigin,
        deleteEmptyDir,
        region,
        bucket,
    } = Object.assign(defaultOptions,options)
    // 上传相关配置
    const getClient = ({accessKeyId,accessKeySecret})=> {
        let client = new OSS({
            region: region || 'oss-cn-hangzhou',
            accessKeyId,
            accessKeySecret,
            bucket: bucket || 'cdn-dooffe',
        });
        return client;
    }
    // 上传到阿里云OSS
    const put = (client, targetPath, localPath)=> {
        console.log(green(`正在上传:${targetPath}`));
        return client.put(targetPath, localPath).then(res => {
            return Promise.resolve({ targetPath, localPath });
        }).catch((err) => {
            return Promise.reject({ targetPath, localPath });
        })
    }
    // 上传文件
    const uploadList = ({ files, answers, callback, errArr, targetPath })=> {
        files.map((v, index) => {
            let serveUrl,
                sourcePath = v;
            if (Object.prototype.toString.call(v) == '[object String]') {
                serveUrl = (targetPath + v.replace(from.replace(/\\/g, "/"), "")).replace(/\\/g, "/")
            }else{
                serveUrl = (targetPath + v.targetPath).replace(/\/\//g, "/");
                sourcePath = v.localPath
            }
            put(getClient({
                accessKeyId: answers.accessKeyId,
                accessKeySecret: answers.accessKeySecret,
            }), serveUrl, sourcePath).then((e) => {
                callback(e);
            }).catch(e => {
                errArr.push(e.localPath);
                callback(e);
            })
        })
    }

    const upload = async (files) =>{
        let targetPath = ossDist;
        if (!ossDist) {
            return console.log(red("插件未配置cdn路径"));
        }
    
        if (!from && !files) {
            return console.log(red("插件需要配置文件输出目录,或文件列表"));
        }
        let answers = await answerFn(answerArr);
        if (answers.uploadCDN) {
            if (!answers.accessKeyId || !answers.accessKeySecret) {
                return console.log(yellow("请输入accessKeyId,accessKeySecret"));
            }
            let errArr = [];
            let len = 0;
            let bar;
            const callback = async function () {
                len += 1;
                bar.tick();
                if (len == files.length) {
                    console.log(green("传完了,错误" + errArr.length));
                    setTimeout(async () => {
                        if (errArr.length != 0) {
                            reloadAnswerArr[0].message = `上传错误${errArr.length}个,是否重新上传`;
                            let accessKeyId = answers.accessKeyId, accessKeySecret = answers.accessKeySecret;
                            answers = await answerFn(reloadAnswerArr);
                            if (answers.LasttimeConfig) {
                                answers.accessKeyId = accessKeyId;
                                answers.accessKeySecret = accessKeySecret;
                            }
                            console.log(answers);
                            files = errArr, errArr = [], len = 0;
                            bar = new ProgressBar(':bar :current/:total', { total: files.length });
                            uploadList({ files, answers, callback, errArr, targetPath });
                        }
                    }, 500);
                }
            }
            bar = new ProgressBar(':bar :current/:total', { total: files.length });
            uploadList({ files, answers, callback, errArr, targetPath });
        }
    }
    // 清空文件目录
    const clearEmptyDir = (filePath:string)=>{
        let dirname = path.dirname(filePath);
        if(fs.existsSync(dirname) && fs.statSync(dirname).isDirectory()){
            fs.reddir(dirname,(err,files)=>{
                if(err) console.error(err)
                else{
                    if(!files.length){
                        fs.rmdir(dirname,(err:any)=>{
                            if(err) console.log(red(err))
                            else console.log(green('empty directory deleted'),dirname)
                        })
                    }
                }
            })
        }
    }
    let outputPath = '';
    return {
        name:'upload-oss-vite',
        configResolved:async(config)=>{
            // 获取需要上传的文件目录路径
            outputPath = path.resolve(config.build.outDir)
        },
        // 打包完成后执行上传
        closeBundle:async(config)=>{
            // 1.获取需要上传的所有文件
            const files = await glob.sync(`${from.replace(/\\/g, "/")}/**/*.*`);
            if(files.length){
                console.log(`\n 当前需要上传的文件目录为${green(files)} \n`);
                try{
                    await upload(files);
                }catch(error:any){
                    console.log(red(error))
                }
            }else{
                console.log(red(`没有需要上传的文件`));
            }
        }

    }
}



export default assetUploadAliOssPlugins;