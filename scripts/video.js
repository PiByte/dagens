class Video
{
    constructor()
    {
        this.videos = [];

        // DOM
        this.video = document.getElementById("main-video");
        this.playButton = document.getElementById("main-play-button");

        this.playButton.addEventListener("click", this.toggle.bind(this));
    }
    
    toggle()
    {
        if (this.isPlaying())
        {
            this.playButton.classList.remove("icon-pause");
            this.playButton.classList.add("icon-play");

            this.pause();
        }
        else
        {
            this.playButton.classList.add("icon-pause");
            this.playButton.classList.remove("icon-play");

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