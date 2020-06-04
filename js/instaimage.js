function insta_function(url) {
    regExp = /((http:\/\/(instagram\.com\/p\/.*\/|www\.instagram\.com\/p\/.*\/))|(https:\/\/(www\.instagram\.com\/p\/.*\/)))/i;
    match = url.match(regExp);
    if (match && match[1].length >= 11) {
        posturl = match[1];
        imgpreview = posturl + 'media?size=m';
        imagehq = posturl + 'media?size=l';
        document.getElementById('imgpreview').src = imgpreview;
        document.getElementById('linkdown').value = imagehq;

        document.getElementById('linkdown').value = imagehq;


         // download(imagehq)
    } else {
        alert("The URL you have entered maybe incorrect. Please Enter a correct URL.");
        location.reload();
    }
}


$(document).keypress(function (event) {
    if (event.which == 115 && (event.ctrlKey || event.metaKey) || (event.which == 19)) {
        event.preventDefault();
        return false;
    }
    return true;
});

$("#download-buttons").hide();
$("#imagedloadbtn").click(function () {
    $("#download-buttons").slideDown(500).fadeIn(250);
    $("#imagedloadbtn").hide();
    $(".input-group").hide();
});


 
function download_image() {

     var urldown = $('#linkdown').val();

     var fileName = 'image' + Math.random();   

    var xhr = new XMLHttpRequest();
    xhr.open('GET', urldown, true);
    xhr.responseType = 'blob';
    
    xhr.onprogress = function(pe) {
    console.log('progress');
    if (pe.lengthComputable) {
        console.log((pe.loaded / pe.total) * 100);
    }	
    };
    
    xhr.onload = function(e) {
    if (this.status == 200) {
        var blob = this.response;
        //TODO fallback needed for IE8 & IE9
        if (navigator.appVersion.toString().indexOf('.NET') > 0) {
            //IE 10+
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            //Firefox, Chrome
            var a = document.createElement("a");
            var blobUrl = window.URL.createObjectURL(new Blob([blob], {type: blob.type}));
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = blobUrl;
        a.download = fileName +'.jpg';
        a.click();
        }
    }
    };
    xhr.send();
}