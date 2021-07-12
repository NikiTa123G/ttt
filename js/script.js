//===================---//calculator//---======================//

let range = document.querySelector('.range');
let number = document.querySelector('.number');
let numberInp = document.querySelector('.number_inp');
let outPrise = document.querySelector('.out_prise');


range.oninput = function() {
	number.innerHTML = "Количество пользователей: " + this.value;
	numberInp.value = this.value;
	outPrise.innerHTML = "Итоговая стоимость за 1 месяц: " + this.value * 500 + "р";
}

numberInp.oninput = function() {
	number.innerHTML = this.value;
	range.value = this.value;
	outPrise.innerHTML = "Итоговая стоимость за 1 месяц: " + this.value * 500 + "р";
}

//=====================---//calculator//---========================//

//======================---//popup//---==========================//

isMobile = {

   Android: function() {
      return navigator.userAgent.match(/Android/i);
   },

   BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
   },
     iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  	},
     Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function() {
      return (
      	isMobile.Android() || 
      	isMobile.BlackBerry() || 
      	isMobile.iOS() || 
      	isMobile.Opera() || 
      	isMobile.Windows()
      );
   }
};

if (isMobile.any()) {
	document.body.classList.add('touch');
}else{
	document.body.classList.add('pc');
}

const popapLinkcs = document.querySelectorAll('.popap_linck');
const body = document.querySelector('body');
const lockPading = document.querySelectorAll(".lock_pading");
const nav = document.querySelector('.navigation');

let unlock = true;

const timeout = 800;

if (popapLinkcs.length > 0) {
	for (let i = 0; i < popapLinkcs.length; i++) {
		const popapLinck = popapLinkcs[i];
		popapLinck.addEventListener("click", function(e) {
			const popapName = popapLinck.getAttribute('href').replace('#', '');
			const curentPopap = document.getElementById(popapName);
			popapOpen(curentPopap);
			e.preventDefault();
		});
	}
}

const popapCloseIcon = document.querySelectorAll('.cloce_popap');

if (popapCloseIcon.length > 0) {
	for (let i = 0; i < popapCloseIcon.length; i++) {
		const el =popapCloseIcon[i];
		el.addEventListener('click', function(e) {
			popapClose(el.closest('.popap'));
			e.preventDefault();
		});
	}
}

const plan = document.querySelector('.plan');

function popapOpen(curentPopap) {
	if (curentPopap && unlock) {
		const popapActive = document.querySelector('.popap.open');
		
		if (popapActive) {
			popapClose(popapActive, false);
		}else {
			bodyLock();
		}
		curentPopap.classList.add('open');
		curentPopap.addEventListener("click", function(e) {
			if (!e.target.closest('.popap_content')) {
				popapClose(e.target.closest('.popap'));
			}
		});
	}
}

function popapClose (popapActive, doUnlock = true) {
	if (unlock) {
		popapActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPadingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPading) {
		for (let i = 0; i < lockPading.length; i++) {
			const el = lockPading[i];
			el.style.padingRight = lockPadingValue;
		}
	}
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function() {
		if (lockPading) {
			for (let i = 0; i < lockPading.length; i++) {
				const el = lockPading[i];
				el.style.padingRight = '0px';
			}
		}
		body.style.padingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popapActive = document.querySelector('.popap.open');
		popapClose(popapActive);
	}
});

//======================---//popup//---==========================//
