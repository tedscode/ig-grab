document.addEventListener('DOMContentLoaded', function () {
    let grabPhotoButton = document.getElementById('grabPhoto');
    let photoPreview = document.getElementById('photoPreview');
    let downloadButton = document.getElementById('downloadButton');
    grabPhotoButton.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function(tab) {
            let request = new XMLHttpRequest();
            request.open('GET', `https://instagram.com/p/${tab.url.split('/')[4]}?__a=1`, true);
            request.send();
            request.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200) {
                    console.log(request.responseText);
                    let response = JSON.parse(this.responseText);
                    photoPreview.style.display = 'initial';
                    downloadButton.style.display = 'initial';
                    photoPreview.src = `${response.graphql.shortcode_media.display_url}`
                    downloadButton.addEventListener('click', function() {
                        chrome.downloads.download({
                            url: `${response.graphql.shortcode_media.display_url}`
                        });
                    });
                }
            }
        });
    });
});
