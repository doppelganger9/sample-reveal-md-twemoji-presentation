const twemoji = require('twemoji');

/**
 * Transform emojis to IMG+SVG using https://github.com/twitter/twemoji
 * for better compatibility with older OS/browsers which do not have proper
 * emojis and only show a disappointing box.
 */
module.exports = (markdown, options) => {
  return new Promise((resolve, reject) => {
    console.log('preprocessed')
    return resolve(
      twemoji.parse(markdown, {
        folder: 'svg',
        ext: '.svg'
      })
    );
  });
};
