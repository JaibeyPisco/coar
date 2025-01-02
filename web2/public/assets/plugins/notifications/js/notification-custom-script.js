  /* Default Notifications */
  function default_noti(titulo, mensaje) {
	Lobibox.notify('default', {
		sound: '../assets/plugins/notifications/sounds/sound4',
        soundExt: '.ogg',
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		rounded: true,
		size: 'mini',
		position: 'center top',
		title: titulo,
		msg: mensaje
	});
}

function info_noti(titulo, mensaje){
	Lobibox.notify('info', {
		sound: '../assets/plugins/notifications/sounds/sound3',
        soundExt: '.ogg',
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		rounded: true,
		size: 'mini',
		position: 'center top',
		icon: 'bx bx-info-circle',
		title: titulo,
		msg: mensaje
	});
}

function warning_noti(titulo, mensaje) {
	Lobibox.notify('warning', {
		sound: '../assets/plugins/notifications/sounds/sound2',
        soundExt: '.ogg',
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		rounded: true,
		size: 'mini',
		position: 'center top',
		icon: 'bx bx-error',
		title: titulo,
		msg: mensaje
	});
}

function error_noti(titulo, mensaje) {
	Lobibox.notify('error', {
		sound: '../assets/plugins/notifications/sounds/sound5',
        soundExt: '.ogg',
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		rounded: true,
		size: 'mini',
		position: 'center top',
		icon: 'bx bx-x-circle',
		title: titulo,
		msg: mensaje
	});
}

function success_noti(titulo, mensaje){
	Lobibox.notify('success', {
		sound: '../assets/plugins/notifications/sounds/sound1',
        soundExt: '.ogg',
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		rounded: true,
		size: 'mini',
		position: 'center top',
		icon: 'bx bx-check-circle',
		title: titulo,
		msg: mensaje
	});
}
/* Rounded corners Notifications */
function round_default_noti() {
	Lobibox.notify('default', {
		pauseDelayOnHover: true,
		size: 'mini',
		rounded: true,
		delayIndicator: false,
		continueDelayOnInactiveTab: false,
		position: 'top right',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function round_info_noti() {
	Lobibox.notify('info', {
		pauseDelayOnHover: true,
		size: 'mini',
		rounded: true,
		icon: 'bx bx-info-circle',
		delayIndicator: false,
		continueDelayOnInactiveTab: false,
		position: 'top right',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function round_warning_noti() {
	Lobibox.notify('warning', {
		pauseDelayOnHover: true,
		size: 'mini',
		rounded: true,
		delayIndicator: false,
		icon: 'bx bx-error',
		continueDelayOnInactiveTab: false,
		position: 'top right',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function round_error_noti() {
	Lobibox.notify('error', {
		pauseDelayOnHover: true,
		size: 'mini',
		rounded: true,
		delayIndicator: false,
		icon: 'bx bx-x-circle',
		continueDelayOnInactiveTab: false,
		position: 'top right',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function round_success_noti() {
	Lobibox.notify('success', {
		pauseDelayOnHover: true,
		size: 'mini',
		rounded: true,
		icon: 'bx bx-check-circle',
		delayIndicator: false,
		continueDelayOnInactiveTab: false,
		position: 'top right',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}
/* Notifications With Images*/
function img_default_noti() {
	Lobibox.notify('default', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		position: 'top right',
		img: 'assets/plugins/notifications/img/1.jpg', //path to image
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function img_info_noti() {
	Lobibox.notify('info', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		icon: 'bx bx-info-circle',
		position: 'top right',
		img: 'assets/plugins/notifications/img/2.jpg', //path to image
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function img_warning_noti() {
	Lobibox.notify('warning', {
		pauseDelayOnHover: true,
		icon: 'bx bx-error',
		continueDelayOnInactiveTab: false,
		position: 'top right',
		img: 'assets/plugins/notifications/img/3.jpg', //path to image
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function img_error_noti() {
	Lobibox.notify('error', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		icon: 'bx bx-x-circle',
		position: 'top right',
		img: 'assets/plugins/notifications/img/4.jpg', //path to image
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function img_success_noti() {
	Lobibox.notify('success', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		position: 'top right',
		icon: 'bx bx-check-circle',
		img: 'assets/plugins/notifications/img/5.jpg', //path to image
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}
/* Notifications With Images*/
function pos1_default_noti() {
	Lobibox.notify('default', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		position: 'center top',
		size: 'mini',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function pos2_info_noti() {
	Lobibox.notify('info', {
		pauseDelayOnHover: true,
		icon: 'bx bx-info-circle',
		continueDelayOnInactiveTab: false,
		position: 'top left',
		size: 'mini',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function pos3_warning_noti() {
	Lobibox.notify('warning', {
		pauseDelayOnHover: true,
		icon: 'bx bx-error',
		continueDelayOnInactiveTab: false,
		position: 'top right',
		size: 'mini',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function pos4_error_noti() {
	Lobibox.notify('error', {
		pauseDelayOnHover: true,
		icon: 'bx bx-x-circle',
		size: 'mini',
		continueDelayOnInactiveTab: false,
		position: 'bottom left',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function pos5_success_noti() {
	Lobibox.notify('success', {
		pauseDelayOnHover: true,
		size: 'mini',
		icon: 'bx bx-check-circle',
		continueDelayOnInactiveTab: false,
		position: 'bottom right',
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}
/* Animated Notifications*/
function anim1_noti() {
	Lobibox.notify('default', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		position: 'center top',
		showClass: 'fadeInDown',
		hideClass: 'fadeOutDown',
		width: 600,
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function anim2_noti() {
	Lobibox.notify('info', {
		pauseDelayOnHover: true,
		icon: 'bx bx-info-circle',
		continueDelayOnInactiveTab: false,
		position: 'center top',
		showClass: 'bounceIn',
		hideClass: 'bounceOut',
		width: 600,
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function anim3_noti() {
	Lobibox.notify('warning', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		icon: 'bx bx-error',
		position: 'center top',
		showClass: 'zoomIn',
		hideClass: 'zoomOut',
		width: 600,
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function anim4_noti() {
	Lobibox.notify('error', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		icon: '',
		position: 'center top',
		showClass: 'lightSpeedIn',
		hideClass: 'lightSpeedOut',
		icon: 'bx bx-x-circle',
		width: 600,
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}

function anim5_noti() {
	Lobibox.notify('success', {
		pauseDelayOnHover: true,
		continueDelayOnInactiveTab: false,
		position: 'center top',
		showClass: 'rollIn',
		hideClass: 'rollOut',
		icon: 'bx bx-check-circle',
		width: 600,
		msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
	});
}