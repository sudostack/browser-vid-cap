(function(d) {
  "use strict";

  d.addEventListener('DOMContentLoaded', function(_event) {
    console.info('DOM ready');

    window.player = new Player();
  });

  // Player
  function Player() {
    var snapshot = new Snapshot();
    this.capture = new CaptureButton(snapshot);
    this.el      = d.getElementById('player');
  }

  Player.prototype.start = function() {
    console.log('start called');
    var self = this;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        // attach video stream to element and start autoplay
        self.el.srcObject = stream;
      });
  };

  function CaptureButton(snapshot) {
    this.el = d.getElementById('capture');

    this.el.addEventListener('click', function() {
      console.log('capture called');
      var context = snapshot.canvas.getContext('2d');
      // Draw the video frame to canvas
      context.drawImage(
        player, 0, 0,
        snapshot.canvas.width,
        snapshot.canvas.height
      );
    });
  };

  // Snapshot (canvas)
  function Snapshot() {
    this.canvas = document.getElementById('snapshot');
  };
})(document);
