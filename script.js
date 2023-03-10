gold = Number(localStorage.getItem('gold')) || 0
up1cost = Number(localStorage.getItem('up1cost')) || 10
up1total = Number(localStorage.getItem('up1total')) || 0
up2cost = Number(localStorage.getItem('up2cost')) || 10
up2total = Number(localStorage.getItem('up2total')) || 0
up1scaling = Number(localStorage.getItem('up1scaling')) || 1.5
up1benefit = Number(localStorage.getItem('up1benefit')) || 1
up2benefit = Number(localStorage.getItem('up2benefit')) || 1.5
up2penalty = Number(localStorage.getItem('up2penalty')) || 0.1
magic = Number(localStorage.getItem('magic')) || 0
mup1cost = Number(localStorage.getItem('mup1cost')) || 1
mup1total = Number(localStorage.getItem('mup1total')) || 0
mup2cost = Number(localStorage.getItem('mup2cost')) || 5
mup2total = Number(localStorage.getItem('mup2total')) || 0
mup3cost = Number(localStorage.getItem('mup3cost')) || 15
mup3total = Number(localStorage.getItem('mup3total')) || 0
mup4cost = Number(localStorage.getItem('mup4cost')) || 50
mup4total = Number(localStorage.getItem('mup4total')) || 0
mgoldmulti = Number(localStorage.getItem('mgoldmulti')) || 1
unlockedIron = Boolean(localStorage.getItem('unlockedIron1')) || false
magic = Number(localStorage.getItem('magic')) || 0
//All Buttons//
var resetdiv = document.getElementById("resetdiv");
var MagicLayer1 = document.getElementById("MagicLayer1");
var MainFrame = document.getElementById("MainFrame");
var IronFrame = document.getElementById("IronFrame");
var IronButton = document.getElementById("IronMenuButton");
var UnlockIronMenuButton = document.getElementById("UnlockIronMenuButton")
var u1button = document.getElementById("up1")
var u2button = document.getElementById("up2")
var reset1button = document.getElementById("reset1")
var mup1button = document.getElementById("magicup1")
var mup2button = document.getElementById("magicup2")
var mup3button = document.getElementById("magicup3")
var mup4button = document.getElementById("magicup4")

//Hover Bools//
u1buttonhover = false
u2buttonhover = false
reset1buttonhover = false
mup1buttonhover = false
mup2buttonhover = false
mup3buttonhover = false
mup4buttonhover = false

const abbrNum = (number, decPlaces) => {
  if (number >= 1e34) {
    return number

  } else if (number <= 1000) {
    return number
  }
  decPlaces = Math.pow(10, decPlaces)
  var abbrev = ['K', 'M', 'B', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'Oc', 'No']
  for (var i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3)
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1
        i++
      }
      number += abbrev[i]
      break
    }
  }
  return number
}

update()

var intervalID = window.setInterval(myCallback, 100);

function myCallback() {
  gold = (gold + ((up1total * up1benefit) + 1) * mgoldmulti)
  update()
}

function buyup1() {
  if (up1cost - 1 < gold) {
    gold = gold - up1cost
    up1total = up1total + 1
    up1cost = Math.round(10 * Math.pow(up1scaling, up1total - 1))
    update()
  }


}
function buyup2() {
  if (up2cost - 1 < up1total) {
    up1cost = 10
    up1total = 0
    up2cost = Math.round(up2cost * 1.2)
    up2total = up2total + 1
    up1scaling = 1.5 + (up2penalty * up2total)
    up1benefit = (1 + mup2total) * Math.pow(up2benefit, up2total)
    gold = 0
    update()
  }
}
function reset1() {
  if (gold > 9999) {
    up1cost = 10
    up1total = 0
    up2cost = 10
    up2total = 0
    up1scaling = 1.6
    up1benefit = 1 + mup2total
    magic = magic + Math.round(Math.pow(gold, 0.5) / 50)
    gold = 0
    update()
  }
}
function buymup1() {
  if (magic > mup1cost - 1) {
    magic = magic - mup1cost
    mup1cost = Math.round(mup1cost * 1.5)
    mup1total = mup1total + 1
    mgoldmulti = mgoldmulti + 1
    update()
  }
}
function buymup2() {
  if (magic > mup2cost - 1) {
    magic = magic - mup2cost
    mup2cost = Math.round(mup2cost * 1.6)
    mup2total = mup2total + 1
    up1benefit = (1 + mup2total) * Math.pow(up2benefit, up2total)
    update()
  }
}
function buymup3() {
  if (magic > mup3cost - 1) {
    magic = magic - mup3cost
    mup3cost = Math.round(mup3cost * 1.4)
    mup3total = mup3total + 1
    up2benefit = up2benefit + 0.1
    up1benefit = (1 + mup2total) * Math.pow(up2benefit, up2total)
    update()
  }
}
function buymup4() {
  if (magic > mup4cost - 1) {
    if (mup4total < 9) {
      magic = magic - mup4cost
      mup4cost = Math.round(mup4cost * 1.7)
      mup4total = mup4total + 1
      up2penalty = up2penalty - 0.01
      up1scaling = 1.5 + (up2penalty * up2total)
      up1cost = Math.round(10 * Math.pow(up1scaling, up1total - 1))
      update()
    }
  }
}

function openMainMenu() {
  IronFrame.style.display = "none"
  MainFrame.style.display = "Block"
}

function openIronMenu() {
  IronFrame.style.display = "Block"
  MainFrame.style.display = "none"
}




function die() {
  gold = 0
  up1cost = 10
  up1total = 0
  up2cost = 10
  up2total = 0
  up1scaling = 1.5
  up1benefit = 1
  up2benefit = 1.5
  up2penalty = 0.1
  magic = 0
  mup1cost = 1
  mup1total = 0
  mup2cost = 5
  mup2total = 0
  mup3cost = 15
  mup3total = 0
  mup4cost = 50
  mup4total = 0
  mgoldmulti = 1
  unlockedIron = false
  update()
}

function update() {
  document.getElementById("earngoldgold").innerHTML = abbrNum(Math.round(((up1total * up1benefit) + 1) * mgoldmulti * 10), 2)
  document.getElementById("goldamount").innerHTML = abbrNum(Math.round(gold), 2)
  document.getElementById("up1total").innerHTML = abbrNum(up1total, 2)
  document.getElementById("up1cost").innerHTML = abbrNum(up1cost, 2)
  document.getElementById("up2cost").innerHTML = abbrNum(up2cost, 2)
  document.getElementById("up2total").innerHTML = abbrNum(up2total, 2)
  document.getElementById("up1effect").innerHTML = abbrNum(Math.round(up1benefit * 10), 2)
  document.getElementById("magicamount").innerHTML = abbrNum(magic, 2)
  document.getElementById("mup1cost").innerHTML = mup1cost
  document.getElementById("mup1total").innerHTML = mup1total + 1
  document.getElementById("mup2cost").innerHTML = mup2cost
  document.getElementById("mup2total").innerHTML = mup2total
  document.getElementById("mup3cost").innerHTML = mup3cost
  document.getElementById("mup3total").innerHTML = mup3total
  document.getElementById("mup4cost").innerHTML = mup4cost
  document.getElementById("mup4total").innerHTML = mup4total
  document.getElementById("up2benefit").innerHTML = up2benefit.toFixed(1)
  document.getElementById("magicgain").innerHTML =
    Math.floor(Math.pow(gold, 0.5) / 50)
  localStorage.setItem('gold', gold)
  localStorage.setItem('up1total', up1total)
  localStorage.setItem('up1cost', up1cost)
  localStorage.setItem('up2cost', up2cost)
  localStorage.setItem('up2total', up2total)
  localStorage.setItem('up1scaling', up1scaling)
  localStorage.setItem('up1benefit', up1benefit)
  localStorage.setItem('up2penalty', up2penalty)
  localStorage.setItem('up2benefit', up2benefit)
  localStorage.setItem('magic', magic)
  localStorage.setItem('mup1total', mup1total)
  localStorage.setItem('mup1cost', mup1cost)
  localStorage.setItem('mup2total', mup2total)
  localStorage.setItem('mup2cost', mup2cost)
  localStorage.setItem('mup3total', mup3total)
  localStorage.setItem('mup3cost', mup3cost)
  localStorage.setItem('mup4total', mup4total)
  localStorage.setItem('mup4cost', mup4cost)
  localStorage.setItem('mgoldmulti', mgoldmulti)
  localStorage.setItem('unlockedIron1', unlockedIron)

  if (gold >= 10000 || magic >= 1 || mup1total >= 1 || mup2total >= 1 || mup3total >= 1 || mup4total >= 1) {
    IronButton.style.display = "block"
    UnlockIronMenuButton.style.display = "none"
    unlockedIron = true
  } else {
    IronButton.style.display = "none"
    UnlockIronMenuButton.style.display = "block"
    unlockedIron = false
  }



  if (gold + 1 <= up1cost) {
    u1button.style.borderColor = "rgb(228, 144, 144)"
  } else {
    u1button.style.borderColor = "rgb(108, 247, 66)"
  }

  if (up1total + 1 <= up2cost) {
    u2button.style.borderColor = "rgb(228, 144, 144)"
  } else {
    u2button.style.borderColor = "rgb(108, 247, 66)"
  }

  if (gold + 1 <= 10000) {
    reset1button.style.borderColor = "rgb(228, 144, 144)"
  } else {
    reset1button.style.borderColor = "rgb(108, 247, 66)"
  }

  if (magic + 1 <= mup1cost) {
    mup1button.style.borderColor = "rgb(228, 144, 144)"
  } else {
    mup1button.style.borderColor = "rgb(108, 247, 66)"
  }

  if (magic + 1 <= mup2cost) {
    mup2button.style.borderColor = "rgb(228, 144, 144)"
  } else {
    mup2button.style.borderColor = "rgb(108, 247, 66)"
  }

  if (magic + 1 <= mup3cost) {
    mup3button.style.borderColor = "rgb(228, 144, 144)"
  } else {
    mup3button.style.borderColor = "rgb(108, 247, 66)"
  }

  if (magic + 1 <= mup4cost) {
    mup4button.style.borderColor = "rgb(228, 144, 144)"
  } else {
    mup4button.style.borderColor = "rgb(108, 247, 66)"
  }
}


u1button.addEventListener('mouseenter', function () {
  u1buttonhover = true
  this.style.backgroundColor = this.style.borderColor
});

u1button.addEventListener('mouseleave', function () {
  u1buttonhover = false
  this.style.backgroundColor = "rgb(85, 85, 85)"
});

u2button.addEventListener('mouseenter', function () {
  u2buttonhover = true
  this.style.backgroundColor = this.style.borderColor
});

u2button.addEventListener('mouseleave', function () {
  u2buttonhover = false
  this.style.backgroundColor = "rgb(85, 85, 85)"
});

reset1button.addEventListener('mouseenter', function () {
  reset1buttonhover = true
  this.style.backgroundColor = this.style.borderColor
});

reset1button.addEventListener('mouseleave', function () {
  reset1buttonhover = false
  this.style.backgroundColor = "rgb(85, 85, 85)"
});

mup1button.addEventListener('mouseenter', function () {
  mup1buttonhover = true
  this.style.backgroundColor = this.style.borderColor
});

mup1button.addEventListener('mouseleave', function () {
  mup1buttonhover = false
  this.style.backgroundColor = "rgb(85, 85, 85)"
});

mup2button.addEventListener('mouseenter', function () {
  mup2buttonhover = true
  this.style.backgroundColor = this.style.borderColor
});

mup2button.addEventListener('mouseleave', function () {
  mup2buttonhover = false
  this.style.backgroundColor = "rgb(85, 85, 85)"
});

mup3button.addEventListener('mouseenter', function () {
  mup3buttonhover = true
  this.style.backgroundColor = this.style.borderColor
});

mup3button.addEventListener('mouseleave', function () {
  mup3buttonhover = false
  this.style.backgroundColor = "rgb(85, 85, 85)"
});

mup4button.addEventListener('mouseenter', function () {
  mup3buttonhover = true
  this.style.backgroundColor = this.style.borderColor
});

mup4button.addEventListener('mouseleave', function () {
  mup3buttonhover = false
  this.style.backgroundColor = "rgb(85, 85, 85)"
});

const observer = new MutationObserver(function (mutationsList, observer) {
  // This function will be called whenever a mutation occurs
  mutationsList.forEach(mutation => {
    if (mutation.attributeName === 'style' && mutation.target.style.borderColor) {
      if (u1buttonhover == true) {
        u1button.style.backgroundColor = u1button.style.borderColor
      }
      if (u2buttonhover == true) {
        u2button.style.backgroundColor = u2button.style.borderColor
      }
      if (reset1buttonhover == true) {
        reset1button.style.backgroundColor = reset1button.style.borderColor
      }
      if (mup1buttonhover == true) {
        mup1button.style.backgroundColor = mup1button.style.borderColor
      }
      if (mup2buttonhover == true) {
        mup2button.style.backgroundColor = mup2button.style.borderColor
      }
      if (mup3buttonhover == true) {
        mup3button.style.backgroundColor = mup3button.style.borderColor
      }
      if (mup4buttonhover == true) {
        mup4button.style.backgroundColor = mup4button.style.borderColor
      }
    }
  });
});


observer.observe(u1button, { attributes: true, attributeFilter: ['style'] });
observer.observe(u2button, { attributes: true, attributeFilter: ['style'] });
