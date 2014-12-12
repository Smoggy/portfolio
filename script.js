
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

function setColumns() {
   $('body, .gallery_wrapper, .gallery')
      .css('width', $(window).width());
  var workColls = Math.floor($(window).width() / 400)
      itemWidth = Math.floor($(window).width() / workColls);
  $('.gallery > ul> li').css('width', itemWidth+'px');
};

$(document).ready(function(){
	var max_z_index = 1;
	var image_cycle = null;
	/*var stickyNavTop = $('.project_menu').offset().top;
		   	
		   	var stickyNav = function(){
			    var scrollTop = $(window).scrollTop();

			    if (scrollTop > stickyNavTop) { 
			        $('.project_menu').addClass('sticky');
			    } else {
			        $('.project_menu').removeClass('sticky'); 
			    }
			};

			stickyNav();
			$(window).scroll(function() {
				stickyNav();
			});
*/
	setColumns();

	$(window).resize(function(){
		setColumns();
	});
	$('.project').hover(
		function(){
			if($(window).width()< 799) { return; }
			var $this = $(this),
				$other_projects = $('.project').not($this).find('.mask'),
			    $project_photos = $(this).find('.project_photos'),
			    $thisHeader = $this.find('h2'),
			    $thisLink = $this.find('.project_link');

			if($this.hasClass('in_active')) { return; };

			TweenLite.to($this, .5, {
          		height: "410px",
          		top: "-55px",
          		ease: Quint.easeInOut
        	});
        	TweenLite.to($project_photos, .5, {
        		marginTop: "0",
          		ease: Quint.easeInOut
        	});
        	TweenLite.to($other_projects, .1, {
          		opacity: ".6",
          		ease: Quint.easeInOut
        	});
        	TweenLite.to($this.find('.bottom_mask'), .5, {
        		opacity: '1',
        		ease: Quint.easeInOut
        	});
        	TweenLite.to($thisHeader, .5, {
          		bottom: "25px",
	          	opacity: "1",
	          	ease: Quint.easeInOut,
	          	delay: .1,
	          	overwrite: 1
	        });
	        TweenLite.to($thisLink, .5, {
	          	bottom: "25px",
	          	opacity: "1",
	          	ease: Quint.easeInOut,
	          	delay: .15,
	          	overwrite: 1,
	          	onComplete: function() {
	            	fadeHoverImages($this);
	          	}
	        });

			max_z_index += 2;
			$this.css('z-index', max_z_index);
			$project_photos.addClass('is-hover');
		},
		function(){
			if($(window).width()< 799) { return; }

			var $this = $(this),
			    $project_photos = $(this).find('.project_photos'),
			    $other_projects = $('.project').not($this).find('.mask'),
			    $thisHeader = $this.find('h2'),
			    $thisLink = $this.find('.project_link');

			if($this.hasClass('in_active')) { return; }

			$project_photos.removeClass('is-hover');

			TweenLite.to($(this), .4, {
          		height: "300px",
          		top: "0",
          		ease: Quint.easeInOut
        	});
        	TweenLite.to($project_photos, .5, {
        		marginTop: "-25px",
          		ease: Quint.easeInOut
        	});
        	TweenLite.to($other_projects, .1, {
          		opacity: "0",
          		ease: Quint.easeInOut
        	});
        	TweenLite.to($this.find('.bottom_mask'), .5, {
        		opacity: '0',
        		ease: Quint.easeInOut
        	});
        	TweenLite.to($thisHeader, .4, {
	          	bottom: "-80px",
	          	opacity: "0",
	          	ease: Quint.easeInOut,
	          	overwrite: 1
	        });
        	TweenLite.to($thisLink, .4, {
	          	bottom: "-80px",
	         	opacity: "0",
	          	ease: Quint.easeInOut,
	          	overwrite: 1,
	          	onComplete: function() {
	            	showFirstImage($this);
	          	}
	        });
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