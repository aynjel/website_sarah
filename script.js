console.log("Youtube-Videos");
let nextPageToken = ""

function getVideos() {
    fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UChRF2-PfpMINsYFelQf5p-A&maxResults=200&order=date&key=AIzaSyCkrsUn_9jiBYc1JlCCPato6rQsHTHvisg&pageToken=" + nextPageToken)
        .then((result) => {
            return result.json();
        }).then((data) => {
            console.log(data)
            let videos = data.items
            nextPageToken = data.nextPageToken
            let videoContainer = document.getElementById("container");

            for (video of videos) {
                let dateUploaded = `${video.snippet.publishTime}`
                let timestamp = new Date(dateUploaded).getTime()
                let Day = new Date(timestamp).getDate()
                // let Month = new Date(timestamp).getMonth() + 1
                let Month = new Date(timestamp).toLocaleString('default', {month: 'long'})
                let Year = new Date(timestamp).getFullYear()
                let OurNewDateFormat = `${Month} ${Day}, ${Year}`

                videoContainer.innerHTML += `
                    <div class="col">
                        <div class="card shadow-sm">
                        <iframe class="bd-placeholder-img card-img-top" width="100%" height="225" src="https://www.youtube.com/embed/${video.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div class="card-body">
                                <p class="card-text">${video.snippet.title}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="https://www.youtube.com/watch?v=${video.id.videoId}" class="btn btn-sm btn-danger">Watch Video</a>
                                    </div>
                                    <small class="text-muted">${OurNewDateFormat}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                

            }


        })
}

getVideos()