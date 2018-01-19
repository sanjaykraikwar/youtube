

// Search for a specified string.
function search() {
	
	var keyword = document.getElementById('query').value;

	var req = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyB7VkFIbTYbzvFfDV8A7eiMWdKQVSeQ3b0&type=video&part=snippet&maxResults=15&q=' + keyword;

	var json = fetch(req).then(function (response) {

		return response.json();
	}).then(function (data) {

		var maincontents = document.getElementById("maincontents");

		maincontents.innerHTML = '';
		
		var slide = new Array(4);
		var count=0;
		for (let i = 0; i < 4; i++) {
			slide[i] = document.createElement('div');

			slide[i].setAttribute('class', 'mySlides');
			
			var str1 = '<div class="row pagination">';

			var str2='';
			
			for (let j = 0; j < 4; j++,count++) {
			str2= str2+	'<div class="column"><img style="width:98%" id="img' + count + '"><div id="titlediv' + count + '" class="centered blue-grey"></div><div id="detailsdiv' + count + '"></div></div>';
			}
			
			var k=i+1;

			var str3='<div class="display-bottommiddle"><a href="#">&laquo;</a><a href="#">'+k+'</a><a href="#">&raquo;</a></div></div>';


			slide[i].innerHTML = str1+str2+str3;

			maincontents.appendChild(slide[i]);

		}

		
		var videoids ='';

		for (let i = 0; i < 15; i++) {


			/* for setting image start*/
			var x = document.getElementById("img" + i);
			x.setAttribute("src", data.items[i].snippet.thumbnails.high.url);
			x.setAttribute("alt", "The Pulpit Rock");
		
			/* for setting image end*/

			/* for setting title start*/
			var para = document.createElement("p");
			var node = document.createTextNode(data.items[i].snippet.title);
			para.appendChild(node);
			var titlediv = document.getElementById("titlediv" + i);
			titlediv.appendChild(para);
			/* for setting title end*/



			/* for setting details start*/

			var description = document.createTextNode(data.items[i].snippet.description);
			var author = document.createTextNode(data.items[i].snippet.channelTitle);
			var published_date = document.createTextNode(data.items[i].snippet.publishedAt);
			
			if(videoids==''){
				videoids = data.items[i].id.videoId;
			}
			else{
			videoids = videoids+','+data.items[i].id.videoId;
			}


			var detailsdiv = document.getElementById("detailsdiv" + i);
			//detailsdiv.setAttribute('class', 'details');
			
			var descdiv = document.createElement('div');

			descdiv.setAttribute('class', 'description');
			
			
			var para1 = document.createElement("p");
			
			var para2 = document.createElement("p");
			
			var para3 = document.createElement("p");
			
			para3.setAttribute('id', 'video'+i);
			
			para1.innerHTML ='<i class="fa fa-male fa-2x icon" aria-hidden="true"></i><span class="details">'+ data.items[i].snippet.channelTitle +'</span>' ;
			
			para2.innerHTML = '<i class="fa fa-calendar fa-2x icon" aria-hidden="true"></i><span class="details">' + data.items[i].snippet.publishedAt +'</span>' ;
				
			detailsdiv.appendChild(para1);
			
			detailsdiv.appendChild(para2);
			
			detailsdiv.appendChild(para3);
			
			
			descdiv.appendChild(description);
			
			detailsdiv.appendChild(descdiv);
			
			showDivs(1);

			/* for setting details end*/

		}
		
		var request = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyB7VkFIbTYbzvFfDV8A7eiMWdKQVSeQ3b0&id='+videoids+'&part=snippet,statistics';
		
		console.log(request);
				
		
	 fetch(request).then(function (response) {

		return response.json();
	}).then(function (data) {
		
		console.log("response");
			for (let i = 0; i < 15; i++) {
				
				document.getElementById('video'+i).innerHTML = '<i class="fa fa-eye fa-2x icon" aria-hidden="true"></i><span class="details">'+data.items[i].statistics.viewCount+'</span>' ;
		
			}

	}).catch(function () {
		console.log("error");
	});

	}).catch(function () {
		console.log("error");
	});
	
	
	


}

var slideIndex = 1;
function plusDivs(n) {
	showDivs(slideIndex += n);
}

function showDivs(n) {
	var i;
	var x = document.getElementsByClassName("mySlides");
	document.getElementById("next").disabled = false; 
	document.getElementById("previous").disabled = false;
	if (n > x.length-1) { 
	document.getElementById("next").disabled = true; 
	document.getElementById("previous").disabled = false;
	}
	if (n < 2) {
			document.getElementById("next").disabled = false; 
	document.getElementById("previous").disabled = true;
		}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	x[slideIndex - 1].style.display = "block";
}
