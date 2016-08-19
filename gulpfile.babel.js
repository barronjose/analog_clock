import gulp from 'gulp';
import sass from 'gulp-sass';
import { create as bsCreate}  from 'browser-sync';
const browserSync = bsCreate();
import useref from 'gulp-useref';
import uglify from 'gulp-uglify';
import gulpIf from 'gulp-if';
import cssnano from 'gulp-cssnano';
import del from 'del';
import runSequence from 'run-sequence';

    gulp.task('sass', () => {
        return gulp.src('./src/sass/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/sass'))
        .pipe(browserSync.reload({
            stream: true
        }));
    });

    gulp.task('browserSync', () => {
        browserSync.init({
            server: {
                baseDir: 'src'
            }
        });
    });

    gulp.task('useref', () => {
        return gulp.src('src/*.html')
            .pipe(useref())
            .pipe(gulpIf('*.css', cssnano()))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('clean:dist', () => {
        return del.sync('dist');
    });

    gulp.task('build', (callback) => {
        runSequence('clean:dist',
            ['sass', 'useref'],
            callback);
    });

    gulp.task('default',(callback) => {
        runSequence(['sass','browserSync', 'watch'],
            callback
        );
    });

    gulp.task('watch', ['browserSync', 'sass'], function(){
        gulp.watch('src/sass/*.scss', ['sass']);
        gulp.watch('src/*.html', browserSync.reload);
        gulp.watch('src/scripts/**/*.js', browserSync.reload);
    });
