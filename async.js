if (Meteor.isServer) {
  Meteor.methods({
    sendEmail: function(step) {
      if (step !== 1 && step !== 2) {
        try {
          steps[step]('tom@thesnail.org', 'hello tom!');
          console.log('it worked!');
        } catch (error) {
          console.log('error', error);
        }
      } else {
        // steps one and two requires a callback
        steps[step]('tom@thesnail.org', 'hello tom!', function(error) {
          if (error) {
            console.log('error', e);
          } else {
            console.log('it worked!');
          }
        });
      }
      
    }
  })
} else {
  send = function(step) {
    Meteor.call('sendEmail', step);
  }
}
