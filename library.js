"use strict";

var lightbox = {},
    suffixRegex = /-resized(\.[\w]+)?/ig,
    findImagesRegex = /<img src="([^"]+)" alt="([^"]+)"([^>])+\/>/ig,
    relativeUrlChars = ['.', '/'];

  function makeLightbox(str, p1, p2) {
    var p1FirstChar = p1.charAt(0),
      p1Orig = p1;
    if (relativeUrlChars.indexOf(p1FirstChar) > -1 && suffixRegex.test(p1)) {
      p1Orig = p1.replace(suffixRegex, '$1');
    }
    return '<a class="lightboxlink" href="' + p1Orig + '" data-lightbox="' + p2 + '" data-ajaxify="false"><img class="lightboximage" src="' + p1 + '" alt="' + p2 + '"></a>';
  }

  lightbox.lightboxPrettify = function (postContent, callback) {
      console.log(postContent.postData.content);
    postContent.postData.content = postContent.postData.content.replace(findImagesRegex, makeLightbox);
    callback(null, postContent);
  };
  lightbox.parseSignature = function (postContent, callback) {
    postContent.userData.signature = postContent.userData.signature.replace(findImagesRegex, makeLightbox);
    callback(null, postContent);
  };
module.exports = lightbox;
