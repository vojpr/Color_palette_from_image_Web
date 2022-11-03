(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();

/**
* Upload file show file name
*/

$('.upload-btn').click(function(){
	document.querySelector('.file-input').click();
});

    $(document).on('change', '.file-input', function() {


  var filesCount = $(this)[0].files.length;

  var textbox = $(this).prev();

  if (filesCount === 1) {
    var fileName = $(this).val().split('\\').pop();
    textbox.text(fileName);
  } else {
    textbox.text('no file selected');
  }
});

/**
* Fader while loading file
*/

$('#getColors').click(function() {
  $('#fader').css('display', 'block');
});

/**
* Checking file size to be less than 2 MB
*/
var uploadField = document.getElementById("file");

uploadField.onchange = function() {
    if(this.files[0].size > 2097152){
       alert("File is too big! Please select a file with a maximum size of 2 MB.");
       this.value = "";
    };
};