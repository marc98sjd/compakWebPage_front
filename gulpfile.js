// gulpfile.js
var gulp = require('gulp');
var sass = require('gulp-sass'); //lenguaje de estilos que incorpora css y otras opciones
var browserSync = require('browser-sync').create(); //plug-in para servir la página en local
var useref = require('gulp-useref'); //plug-in para juntar y optimizar archivos (js/css)
var gulpIf = require('gulp-if'); //plug-in para diferenciar si es un archivo .js o .css, para después ofuscar el código
var uglify = require('gulp-uglify'); //plug-in para ofuscar .js
var cssnano = require('gulp-cssnano'); //plug-in para ofuscar .css
var imagemin = require('gulp-imagemin'); //plug-in para optimizar imagenes
var cache = require('gulp-cache'); // plug-in para optimizar imagenes solo cuando sea necesario (ya que es un proceso lento)
var del = require('del'); //plug-in para borrar archivos que no se usen
var runSequence = require('run-sequence'); //plug-in para asegurar que unas tareas se completen antes que otras (sino se podrian subir los archivos a dist antes de que se borrase la carpeta)

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//servir en local
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
});

gulp.task('watch', ['browserSync', 'sass'], function(){
    //recarga navegador si se guarda algun archivo .scss, .js o .html
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/**/*.css', browserSync.reload);
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

// optimizar y obscurecer archivos .JS y .CSS, y subirlos a dist
gulp.task('useref', function(){
    return gulp.src('src/*.html')
        .pipe(useref())
        // Minifies only if it's a JS file
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

// optimizar imagenes y guardarlas en caché, además de subirlas a dist
gulp.task('images', function(){
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// pasar src/fonts/ a dist/fonts/
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

/*
 Limpiar el directorio dist antes de optimizar, obscurecer y subir los archivos a dist
 **nota interesante: no tenemos que preocuparnos de que borre las imagenes de dist (es un proceso lento), porque gulp-cache las guarda en caché
 */
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

/*
- tarea que se ejecuta escribiendo 'gulp' (por la palabra reservada 'default')
- comando a ejecutar para desarrollar en local
 */
gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
        callback
    )
});

// asegurar que se corren unas tareas antes que otras con el plugin run-sequence
gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})

//si se quisieran borrar las imagenes en caché
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});