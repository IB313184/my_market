$(function(){

    var el_1 = new elipse($('.small-fly-round'), 826, 240, -6, 112, 1);
    el_1.animate();

    var el_2 = new elipse($('.small-fly-round-2'), 593, 113, 110, 110, -1);
    el_2.animate();

    height_fixed();

    if($('.v-line-sp-but').length){
        var follower = $('.v-line-sp-but .arr');
        var mouseX = 0;
        var mouseY = 0;

        var offset = follower.offset();
        var c_x = offset.left+26;
        var c_y = offset.top+26;

        $(window).mousemove(function(e){
            mouseX = e.pageX;
            mouseY = e.pageY;
            if (mouseX < 0) mouseX = 0;
            if (mouseY < 0) mouseY = 0;

            var angle = Math.round( Math.atan( ( mouseY - c_y ) / ( mouseX - c_x ) ) * ( 180 / Math.PI ) );

            if(mouseX < c_x){
                angle = angle-180;
            }else if(mouseX == c_x){
                angle = angle+180;
            }

            follower.css({
                '-webkit-transform': 'rotate('+angle+'deg)',
                '-ms-transform': 'rotate('+angle+'deg)',
                'transform': 'rotate('+angle+'deg)'
            });
        });
    }

    init_rate_carousel();

    if($('.offer-slider').length){
        $('.offer-slider .wrap .item').width($('.offer-slider').width());
        $('.offer-slider').jcarousel({
            wrap: 'circular'
        }).jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: true
        });

        $('.offer-slider-pag')
            .on('jcarouselpagination:active', 'a', function () {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function () {
                $(this).removeClass('active');
            })
            .on('click', function (e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                perPage: 1,
                item: function (page) {
                    return '<a href="#' + page + '"></a>';
                }
            });
    }

});

function init_rate_carousel() {
    var carousel = $('.mp-carousel');
    var jc_item = carousel.find('.item');
    var jc_wrap = carousel.find('.bline');
    var min_el_width = 140; //+10 margin right
    var w = carousel.width();
    var view_els = Math.floor(w / min_el_width);
    var w_el = w / view_els;
    jc_item.width(w_el-10);
    var wrap_w = jc_item.length*w_el;

    var max_translate_x = wrap_w-w;
    var cur_translate_x = 0;
    setInterval(function(){
        if(cur_translate_x<max_translate_x){
            cur_translate_x = cur_translate_x+1;
        }else{
            cur_translate_x = 0;
        }
        jc_wrap.css({
            'transform': 'translateX(-'+cur_translate_x+'px)'
        });
    }, 20);
}

var elipse = function(el, x, y, cor_x, cor_y, start){
    this.b_x_axes = x;
    this.b_y_axes = y;
    this.p_x_axes = this.b_x_axes/2;
    this.p_y_axes = this.b_y_axes/2;
    this.x_axes_step = 15;
    this.x = (start>0) ? -this.p_x_axes : this.p_x_axes;
    this.y = 0;
    this.direction = 1;
    this.y_direction = 1;

    var self = this;

    this.animate = function(){
        setInterval(function(){
            self.y = Math.sqrt((Math.pow(self.p_y_axes, 2)/Math.pow(self.p_x_axes, 2))*(Math.pow(self.p_x_axes, 2)-Math.pow(self.x,2)))*self.y_direction;

            el.css({
                'left': (self.x+self.p_x_axes+cor_x) + 'px',
                'top': (-self.y+cor_y) + 'px'
            });

            if(self.direction > 0){ //вправо
                self.x = self.x + self.x_axes_step;
                if(self.x > self.p_x_axes){
                    self.direction = -1;
                    self.y_direction = -1;
                    self.x = self.p_x_axes;
                }
            }else{
                self.x = self.x - self.x_axes_step;
                if(self.x < -self.p_x_axes){
                    self.direction = 1;
                    self.y_direction = 1;
                    self.x = -self.p_x_axes;
                }
            }

        }, 150);
    }
}

function height_fixed(){
    var height = window.innerHeight || document.documentElement.clientHeight;
    if($('.rccol').length){
        if($('.rccol').height() > height){
            $('body,html').css({
                    'height': 'auto',
                    'min-height': 'auto'
                }
            );
        }else{
            $('body,html').css({
                    'height': '100%',
                    'min-height': '100%'
                }
             );
        }
    }
}

$(document).on('change', '.custom-select select', function(){
    var val = $(this).val();
    if(val){
        $(this).siblings('.val').removeClass('placeholder').html(val);
    }else{
        $(this).siblings('.val').addClass('placeholder').html($(this).attr('placeholder'));
    }
});

$(document).on('click', '.custom-radio', function(){
    if(!$(this).hasClass('act')){
        var val = $(this).data('val');
        var input = $(this).data('input');
        $('.custom-radio[data-group="'+$(this).data('group')+'"]').removeClass('act');
        $(this).addClass('act');
        $('#'+input).val(val);
    }
});

$(document).on('click', '.phone-country', function(){
    $(this).find('.list').fadeToggle();
});
$(document).on('click', '.phone-country .list .item', function(){
    var img = $(this).find('img').clone();
    $(this).closest('.phone-country').find('.val').html(img);
});


$(document).on('click', '.but-slider', function () {
    $(this).toggleClass('on');
});

$(document).on('click', '.curtail-box', function () {
    if($(this).hasClass('act')){
        $(this).find('.min').hide();
        $(this).find('.plus').show();
        $(this).removeClass('act');
        $(this).closest('.grey-box').find('.tb-data').hide();
    }else{
        $(this).find('.min').show();
        $(this).find('.plus').hide();
        $(this).addClass('act');
        $(this).closest('.grey-box').find('.tb-data').show();
    }
});

$(document).on('keyup', '.signup-phone', function () {
    if($(this).val()){
        $('.sp-get-code').show();
        $('.sp-code-input').show();
    }else{
        $('.sp-get-code').hide();
        $('.sp-code-input').hide();
    }
});

$(document).on('click', '.custom-checkbox', function(){
    var val = $(this).data('val');
    var input = $(this).data('input');
    if(!$(this).hasClass('act')){
        $(this).addClass('act');
        $('#'+input).val(val);
    }else{
        $(this).removeClass('act');
        $('#'+input).val('');
    }
});

$(document).on('click', '.faq-group .item', function(){
    $(this).toggleClass('act');
    $(this).find('.answer').slideToggle(400, 'swing', function(){
        height_fixed();
    });
});

$(document).on('click', '.faq-group-list .item', function(){
    var group = $(this).data('group');
    $('.faq-group-list .item').removeClass('act');
    $(this).addClass('act');

    $('.faq-group').hide();
    $('.gr'+group).show();

    $('.support-form').hide()
});

$(document).on('click', '.sc-us-data-but.sf', function(){
    $('.faq-group-list .item').removeClass('act');
    $('.faq-group').hide();
    $('.support-form').show();
});

$(document).on('click', '.switcher-box .item', function(){

    var group = $(this).closest('.switcher-box').data('group');

    $('.switcher-box .item').removeClass('act');
    $(this).addClass('act');

    var index = $(this).index();

    $('.' + group).hide();
    $('.' + group).eq(index).show();
});

$(document).on('click', '.show-inr-withdraw-form', function(e){
    e.preventDefault();
    var box = $('.inr-withdraw-box');
    var form = $('.inr-withdraw-form-box');

    if(!box.hasClass('act')){
        box.addClass('act');
        setTimeout(function(){
            form.addClass('act');
        }, 300);
        $(this).html('Hide withdraw form');
    }else{
        form.removeClass('act');
        setTimeout(function(){
            box.removeClass('act');
        }, 300);
        $(this).html('Withdraw');
    }
});

$(document).on('click', '.login-control-but', function(e){
    e.preventDefault();
    var type = $(this).data('type');
    if(type == 'fp'){
        $('.login-form-box').hide();
        $('.forgotpass-form-box').fadeIn();
    }else{
        $('.login-form-box').fadeIn();
        $('.forgotpass-form-box').hide();
    }
});

$(document).on('click', '.af-inv-switcher .item', function(e){
    e.preventDefault();
    var type = $(this).data('type');

    $('.af-inv-switcher .item').removeClass('act');
    $(this).addClass('act');

    $('.invite-box').hide();
    $('.invite-box.ib-'+type).fadeIn();
});

$(document).on('click', '.top-user-box .uw-box .wallet .item', function(e){
    e.preventDefault();

    $('.top-user-box .uw-box .wallet .item').removeClass('act');
    $(this).addClass('act');
});

