import path from 'path';
import glob from 'glob';
import OSS from 'ali-oss';
import inquirer from 'inquirer';
import progress from 'progress';
import { normalizePath } from 'vite';


interface Option {
    region:string,
    accessKeyId:string,
    accessKeySecret:string,
    bucket:string
}


const options:Option = {
    region:"oss-cn-hangzhou",
    accessKeyId:"",
    accessKeySecret:"",
    bucket:'cdn-dooffe'
}


const answerArr = [
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

const put = function (client, targetPath, localPath) {
    console.log(`正在上传:${targetPath}`);
    return client.put(targetPath, localPath).then(res => {
        return Promise.resolve({ targetPath, localPath });
    }).catch((err) => {
        return Promise.reject({ targetPath, localPath });
    })
}

const answerFn = function (arr) {
    return inquirer.prompt(arr);
}

const uploadList = function ({ files, answers, config, callback, errArr, targetPath, url }) {
    console.log(files.length)
    files.map((v, index) => {
        // console.log((targetPath + v.replace(url.replace(/\\/g, "/"), "")).replace(/\/\//g, "/"))
        let serveUrl,
            sourcePath = v;
        if (Object.prototype.toString.call(v) == '[object String]') {
            //如果是字符串
            serveUrl = (targetPath + v.replace(url.replace(/\\/g, "/"), "")).replace(/\/\//g, "/")
        } else {
            serveUrl = (targetPath + v.targetPath).replace(/\/\//g, "/");
            sourcePath = v.localPath
        }

        put(getClient({
            accessKeyId: answers.accessKeyId,
            accessKeySecret: answers.accessKeySecret,
            bucket: config.bucket || "",
            region: config.region || ""
        }), serveUrl, sourcePath).then((e) => {
            callback(e);
        }).catch(e => {
            errArr.push(e.localPath);
            callback(e);
        })
    })
}

//上传
const uploadFn = async function () {
    let targetPath = this.config.CdnTargetPath;
    let config = this.config;
    if (!this.config.CdnTargetPath) {
        return console.log("插件未配置cdn路径");
    }

    if (!this.config.outputdir && !this.config.files) {
        return console.log("插件需要配置文件输出目录,或文件列表");
    }
    let answers = await answerFn(answerArr);
    if (answers.uploadCDN) {
        if (!answers.accessKeyId || !answers.accessKeySecret) {
            return console.log("请输入accessKeyId,accessKeySecret");
        }
        let url = this.config.outputdir || '';
        let inputFiles = this.config.files;
        let configOutputFiles = url ? glob.sync(`${url.replace(/\\/g, "/")}/**/*.*`) : [];
        let files = this.config.merge ? (inputFiles || []).concat(configOutputFiles) : inputFiles || configOutputFiles;
        let errArr = [];
        let len = 0;
        let bar;

        const callback = async function () {
            len += 1;
            bar.tick();
            if (len == files.length) {
                console.log("传完了,错误" + errArr.length);
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
                        uploadList({ files, answers, config, callback, errArr, targetPath, url });
                    }
                }, 500);
            }
        }
        console.log(url);
        bar = new ProgressBar(':bar :current/:total', { total: files.length });
        uploadList({ files, answers, config, callback, errArr, targetPath, url });
    }
}


class uploadAlioss {
    constructor(opts) {
        this.config = Object.assign(options,options)
        console.log(opts,this.config);
    }
    apply(compiler) {
        compiler.hooks.done.tap('uploadAlioss', (compilation,) => {
            if (!this.config.env) return console.log("uploadAlioss插件未配置env为true不上传阿里云");
            console.log("打包完成")
            if (!this.config.CdnTargetPath) {
                return console.log("插件未配置cdn路径");
            }
            if (!this.config.outputdir) {
                return console.log("插件未配置打包输出目录");
            }
            setTimeout(() => {
                uploadFn.apply(this);
            }, 500);
        })
    }
    upload() {
        return uploadFn.apply(this);
    }
}


export default uploadAlioss;