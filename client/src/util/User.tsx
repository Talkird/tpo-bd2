var User = (function() {
    var email = "";
    var timer = 0;

    var getEmail = function() {
      return email;
    };

    var setEmail = function(newEmail: string) {
      email = newEmail;     
    };
  
    var clearEmail = function() {
      setEmail("");
    };

    var getTimer = function() {
      return timer;
    };

    var startTimer = function() {
      timer = Date.now();
    };

    var stopTimer = function() {
      timer = 0;
    };

    return {
      getEmail: getEmail,
      setEmail: setEmail,
      clearEmail: clearEmail,
      getTimer: getTimer,
      startTimer: startTimer,
      stopTimer: stopTimer
    }
  })();
  
  export default User;