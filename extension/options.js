(function () {
  'use strict';

  // DOM / CSS handling with zeptojs
  $(function() {
    $('.menu a').click(function(ev) {
      ev.preventDefault();
      var selected = 'selected';
      $('.mainview > *').removeClass(selected);
      $('.menu li').removeClass(selected);
      setTimeout(function() {
        $('.mainview > *:not(.selected)').css('display', 'none');
      }, 100);
      $(ev.currentTarget).parent().addClass(selected);
      var currentView = $($(ev.currentTarget).attr('href'));
      currentView.css('display', 'block');
      setTimeout(function() {
        currentView.addClass(selected);
      }, 0);
      setTimeout(function() {
        $('body')[0].scrollTop = 0;
      }, 200);
    });
    $('.mainview > *:not(.selected)').css('display', 'none');
  });

  document.addEventListener('DOMContentLoaded', function () {
    var inputLandingPageHome = document.getElementById('landingPageHome');
    var inputLandingPageNotifications = document.getElementById('landingPageNotifications');
    var successMessage = document.getElementById('success_message');
    var successTimeout = null;

    // Laod options
    function loadOptions() {
      // page
      if (localStorage.getItem('landingPage') === null) {
        inputLandingPageHome.checked = true;
      } else {
        if (localStorage.getItem('landingPage') === 'home') {
          inputLandingPageHome.checked = true;
        } else if (localStorage.getItem('landingPage') === 'notifications') {
          inputLandingPageNotifications.checked = true;
        }
      }
    }
    loadOptions();

    // Save
    document.getElementById('landingPageHome').addEventListener('change', function () {
      saveOptions();
    });
    document.getElementById('landingPageNotifications').addEventListener('change', function () {
      saveOptions();
    });

    function saveOptions() {
      if (inputLandingPageHome.checked) {
        localStorage.setItem('landingPage', 'home');
      } else {
        localStorage.setItem('landingPage', 'notifications');
      }
      chrome.runtime.sendMessage({do: 'updatebadge'});
      // success message
      clearTimeout(successTimeout);
      successMessage.classList.add('visible');
      successTimeout = setTimeout(function() {
        successMessage.classList.remove('visible');
      }, 2000);
    }
  });
})();