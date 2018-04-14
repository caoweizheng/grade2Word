// 在nodejs环境下运行的js文件
// 按照nodejs的语法使用

// 引用模块: require();  得到一个对象/函数
// gulp,gulp-sass

let gulp = require('gulp');//{task(),}
let sass = require('gulp-sass');//fn


// sass->css
gulp.task('compileSass',function(){
	// 先查找sass文件所在目录
	gulp.src('./src/sass/*.scss') // 返回文件流（液体，文件在内存中的状态）  
    // .pipe(concat('concat.scss'))  
    // scss->css
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    // .pipe(rename({suffix:'.min'}))
	// 输出到硬盘
	.pipe(gulp.dest('./src/css/'))
});


// 监听文件修改，自动执行编译任务
gulp.task('jtSass',function(){
	gulp.watch('./src/sass/*.scss',['compileSass'])
});

let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
// let pump = require('pump');
let babel = require('gulp-babel');
// js文件 
// 合并
// 压缩
// 重命名
gulp.task('concat',function(){

    gulp.src('./src/js/*.js')
    // 合并
    .pipe(concat('concat.js'))
    // 转换
    .pipe(babel({
            presets: ['es2015']
        }))

    //写入
    .pipe(gulp.dest('./dist/js'))
    // 压缩
    .pipe(uglify())
    // 重命名
    .pipe(rename({suffix:'.min'}))
    // 写入
    .pipe(gulp.dest('./dist/js'));
});



let htmlmin = require('gulp-htmlmin');

// html压缩
gulp.task('compressHtml',function(){

    gulp.src('./src/**/*.html')

    .pipe(concat('concat.html'))

    .pipe(rename({suffix:'.min'}))

    .pipe(htmlmin({collapseWhitespace: true}))

    .pipe(gulp.dest('./dist/html'))
});


// 自动刷新服务器
let browserSync = require('browser-sync');

// 静态服务器
gulp.task('server',()=>{
    browserSync({
        // 服务器路径
        // server:'./src/',

        // 代理服务器
        proxy:'http://localhost:2222',

        // 端口
        port:10001,

        // 监听文件修改，自动刷新
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
    });

    // 监听sass文件修改，并自动编译
    gulp.watch('./src/sass/*.scss',['compileSass'])
})