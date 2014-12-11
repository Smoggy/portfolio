
function fadeHoverImages(project) {
  var $projectImg = project.find('.project_photos'),
    $projectImage = project.find('img');

  if($projectImg.hasClass('is-hover')) {
    if($projectImage.length > 1) {
      var $visibleImg = $projectImage.first(),
        $nextImg = $visibleImg.next(),
        nextImgSrc = $nextImg.attr('data-src');

      $('<img>').attr('src', nextImgSrc).load(function() {
        $nextImg.attr('src', nextImgSrc).css('display', 'block').animate({
          'opacity': '1'
        }, 450, function(){
          $visibleImg.css('opacity', '0').attr('data-src', $visibleImg.attr('src')).appendTo($projectImg);
          setTimeout(function() {
            fadeHoverImages(project);
          }, 300);
        });
      });
      
    }
  }
};

function showFirstImage(project) {
  var $projectImg = project.find('.project_photos'),
    $projectImage = project.find('img'),
    $projectImageFirst = project.find('.is-first'),
    $projectImageFirstChild = $projectImage.first();
  if(!$projectImageFirstChild.hasClass('is-first')) {
    setTimeout(function() {
      $projectImageFirstChild.animate({
        'opacity': '0'
      }, 450);
      $projectImageFirst.prependTo($projectImg).css('opacity', '1');
    }, 200);
  }
};

$(document).ready(function(){
	var max_z_index = 1;
	var image_cycle = null;

	
	$('.project').hover(
		function(){
			var active = $(this);
			if(active.hasClass('in_active')) { return; };
			active.stop().animate({
				height: "410",
				top: "-55"
			},400, function(){
				active.find('h2').stop().animate({ opacity: '1', bottom: '25' }, 200 );
				active.find('.project_link').stop().animate({ opacity: '1', bottom: '25' }, 200 );
				fadeHoverImages(active);
			});
			max_z_index += 2;
			active.css('z-index', max_z_index);
			active.find('.project_photos').addClass('is-hover');
			active.find('.project_photos').stop().animate({ marginTop: '0'}, 400 );
			$('.project').not(active).find('.mask').css({ opacity: '0.6'} );
			active.find('.bottom_mask').stop().animate({ opacity: '1'}, 200 );
		},
		function(){
			var active = $(this);
			if(active.hasClass('in_active')) { return; }
			$(this).stop().animate({
				height: "300",
				top: "0"
			},400, function(){
				showFirstImage(active);
			});
			active.find('.project_photos').removeClass('is-hover');
			active.find('.project_photos').stop().animate({ marginTop: '-25'}, 400 );
			$('.project').not(active).find('.mask').css({ opacity: '0'} );
			active.find('.bottom_mask').stop().animate({ opacity: '0'}, 200 );
			active.find('h2').stop().animate({ opacity: '0', bottom: '-80' }, 100 );
			active.find('.project_link').stop().animate({ opacity: '0',  bottom: '-80' }, 100 );
		}
	);

	$('.project_menu li').on('click', function(){
		$(this).addClass('active');
		var type = $(this).find('a').attr('href').substring(1);
		if(type === 'All'){
			$('.project').removeClass('in_active');
		} else {
			var active_projects = $('.project[data-type="'+type+'"]').removeClass('in_active');
			$('.project').not(active_projects).addClass('in_active');
		}
		$('.project_menu li').not(this).removeClass('active');
	});
});