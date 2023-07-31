const audioPlayer = document.getElementById('audioPlayer');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    let currentButton = null;

    function togglePlayPause(songUrl, button) {
      if (currentButton && currentButton !== button) {
        // Pause the currently playing song
        currentButton.querySelector('i').classList.remove('fa-pause');
        currentButton.querySelector('i').classList.add('fa-play');
        currentButton = null;
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }

      if (currentButton === button) {
        
        if (audioPlayer.paused) {
          audioPlayer.play();
          button.querySelector('i').classList.remove('fa-play');
          button.querySelector('i').classList.add('fa-pause');
        } else {
          audioPlayer.pause();
          button.querySelector('i').classList.remove('fa-pause');
          button.querySelector('i').classList.add('fa-play');
        }
      } else {
      
        currentButton = button;
        audioPlayer.src = songUrl;
        audioPlayer.play();
        button.querySelector('i').classList.remove('fa-play');
        button.querySelector('i').classList.add('fa-pause');
        updateProgressBar();
      }
    }

    function updateProgressBar() {
      const interval = setInterval(() => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        if (currentTime && duration) {
          const progressPercentage = (currentTime / duration) * 100;
          progress.style.width = `${progressPercentage}%`;

          if (currentTime === duration) {
            clearInterval(interval);
            currentButton.querySelector('i').classList.remove('fa-pause');
            currentButton.querySelector('i').classList.add('fa-play');
            currentButton = null;
          }
        }
      }, 100);
    }

    function seek(event) {
      const progressBarRect = progressBar.getBoundingClientRect();
      const clickPositionX = event.clientX - progressBarRect.left;
      const progressBarWidth = progressBarRect.width;
      const seekTime = (clickPositionX / progressBarWidth) * audioPlayer.duration;
      audioPlayer.currentTime = seekTime;
    }