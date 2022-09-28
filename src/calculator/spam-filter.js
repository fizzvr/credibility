const wash = require('washyourmouthoutwithsoap');

module.exports = class SimpleSpamFilter {
  /**
   *
   * @param {Array} opts
   */
  constructor(opts) {
    this.minWords = opts.minWords;
    this.maxPercentCaps = opts.maxPercentCaps;
    this.maxNumSwearWords = opts.maxNumSwearWords;
    this.lang = opts.lang;
  }
  isSpam(tweet) {
    if (
      this.minWords !== undefined &&
      tweet.split(' ').length < this.minWords
    ) {
      return true;
    }

    if (
      this.maxPercentCaps !== undefined &&
      percentCaps(tweet) > this.maxPercentCaps
    ) {
      return true;
    }

    if (
      this.maxNumSwearWords !== undefined &&
      numSwearWords(tweet, this.lang) > this.maxNumSwearWords
    ) {
      return true;
    }

    return false;
  }
};

/*
 * Returns the percentage of the tweet that consists of capitalized characters.
 * @param tweet - the tweet to analyze
 * @returns {number}
 * @api private
 */

function percentCaps(tweet) {
  let capCount = 0;
  const chars = tweet.split('');

  chars.forEach(function (char) {
    if (char === char.toUpperCase()) {
      capCount++;
    }
  });

  return (capCount / tweet.length) * 100;
}

/*
 * Returns the number of swear words in the tweet.
 * @param tweet - the tweet to analyze
 * @returns {number}
 * @api private
 */

function numSwearWords(tweet, lang) {
  function getCleanedWords(text) {
    return text.replace(/[.]|\n|,/g, ' ').split(' ');
  }
  return getCleanedWords(tweet).filter((word) => wash.check(lang, word)).length;
}
