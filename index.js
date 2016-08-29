/**
 * 搜寻页面上的视频
 * <source src="xxx.mp4"></source>
 * @author luoying
 */

'use strict';

const fs = require('fs');
const path = require('path');
const gutil = require('gulp-util');
const through2 = require('through2');
const getMatchs = require('@tools/matchs');

const collect = (html, options) => {
  let videos = [];
  let types = options.types.split(',');
  types = types.length > 1 ? `(?:${types.join('|')})` : types.join('');

  let reg = new RegExp(`<source.+src=["|']?([^"']+\\.${types})["|']?[^>]*\/?>`, 'gi');
  let matchs = getMatchs(html, reg);
  matchs.forEach(match => videos.indexOf(match[1]) === -1 && videos.push(match[1]));
  return videos;
};

exports.collect = (options) => {
  options = Object.assign({
    base: '',
    types: ''
  }, options || {});

  return through2.obj(function(file, enc, cb) {
    if (file.isNull()) return cb(null, file);

    let base = file.base;
    let html = file.contents.toString();
    let videos = collect(html, options);

    for (let video of videos) {
      let pathname = path.join(base, video);
      try {
        let contents = fs.readFileSync(pathname);
        let file = new gutil.File({
          base: options.base || base,
          path: options.base ? 'videos/' + path.basename(video) : pathname,
          contents: contents
        });
        this.push(file);
      } catch (e) {
        console.log(`not found the ${pathname}`);
      }
    }

    cb();
  });
};
