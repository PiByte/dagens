class Video
{
    constructor()
    {
        this.videos = [];

        // DOM
        this.video = document.getElementById("video");
        this.playPauseButton = document.getElementById("playPauseButton");

        this.playPauseButton.addEventListener("click", this.toggle.bind(this));

        // Set icon
        // We're assuming that autoplay works --> pause icon
        document.getElementById("playPauseButton").classList.add("pauseIcon");
    }
    
    toggle()
    {
        if (this.isPlaying())
        {
            document.getElementById("playPauseButton").classList.remove("pauseIcon");
            document.getElementById("playPauseButton").classList.add("playIcon");

            this.pause();
        }
        else
        {
            document.getElementById("playPauseButton").classList.add("pauseIcon");
            document.getElementById("playPauseButton").classList.remove("playIcon");

            this.play();
        }
    }

    // List of paths to mp4 files
    async preloadVideos(paths)
    {
        for (var path of paths)
            this.videos.push(await preload(path));
    }

    loadVideo(index)
    {
        if (index > this.videos.length - 1)
            return debugPrint(`ERROR: Unknown video index: ${index}`);
                
        this.video.src = this.videos[index];
        this.play();
    }

    isPlaying() { return (this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2); }
    play() { this.video.play(); }
    pause() { this.video.pause(); }
}