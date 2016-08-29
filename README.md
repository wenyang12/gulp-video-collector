# gulp-video-collector

> 搜寻页面上的视频

```html
const videoCollector = require('@tools/gulp-video-collector');
gulp.task('md5-video', () =>
  gulp.src('build/*.html')
  .pipe(videoCollector.collect({
    types: 'mp4,webm',
    base: 'build'
  }))
  .pipe(plugins.rev())
  .pipe(gulp.dest('build/web/v2.0/videos'))
  .pipe(plugins.rev.manifest())
  .pipe(gulp.dest('build/rev/video'))
);
```
