var DateTime = luxon.DateTime;
var dt = DateTime.now();
var year = dt.year
var month = dt.month
var day = dt.day

var phaseArray = ['New Moon', 'Waxing Crescent', 'Quarter Moon', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter Moon', 'Waning Crescent']

var emojiPhaseArray = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']

function calcMoonPhase() {

  /*
  Algorithm adapted from http://www.voidware.com/moon_phase.htm
  0: New Moon
  1: Waxing Crescent Moon
  2: Quarter Moon
  3: Waxing Gibbous Moon
  4: Full Moon
  5: Waning Gibbous Moon
  6: Last Quarter Moon
  7: Waning Crescent Moon
  */

  if (month < 3) {
    year-1;
    month+=12;
  }
  month+1;
  c = 365.25*year;
  e = 30.6*month;
  totalElapsed = c+e+day-694039.09;
  totalElapsed /= 29.53; //divide by the moon cycle
  console.log(totalElapsed)
  b = totalElapsed*8 + 0.5; //scale fraction from 0-8 and round by adding 0.5
  b = b & 7; // 0 and 8 are the same so turn 8 into 0
  return b;
}

function calcNextNewMoon() {
  if (month < 3) {
    year-1;
    month+=12;
  }
  month+1;
  c = 365.25*year;
  e = 30.6*month;
  totalElapsed = c+e+day-694039.09;
  totalElapsed /= 29.53; //divide by the moon cycle
  decimalOfTotalElapsed = totalElapsed-=Math.floor(totalElapsed)
  daysSinceNewMoon = Math.floor(decimalOfTotalElapsed*29.53)
  lastNewMoonDay = day-daysSinceNewMoon
  nextNewMoonDayIn = Math.floor((lastNewMoonDay+29.5)-day)
  return(nextNewMoonDayIn)
}

function calcNextFullMoon() {
  if (month < 3) {
    year-1;
    month+=12;
  }
  month+1;
  c = 365.25*year;
  e = 30.6*month;
  totalElapsed = c+e+day-694039.09;
  totalElapsed /= 29.53; //divide by the moon cycle
  decimalOfTotalElapsed = totalElapsed-=Math.floor(totalElapsed)
  daysSinceNewMoon = Math.floor(decimalOfTotalElapsed*29.53)
  lastNewMoonDay = day-daysSinceNewMoon
  nextFullMoonDayIn = (Math.floor((lastNewMoonDay+29.5)-day))+15
  return(nextFullMoonDayIn)
}

calcMoonPhase()
calcNextNewMoon()
calcNextFullMoon()

document.getElementById("todayMoonPhase").innerHTML = phaseArray[b];
document.getElementById("todayMoonPhaseEmoji").innerHTML = emojiPhaseArray[b];
document.getElementById("todayDate").innerHTML = dt.toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' });
document.getElementById("nextNewMoonDate").innerHTML = DateTime.local().plus({ days: nextNewMoonDayIn }).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })
document.getElementById("nextFullMoonDate").innerHTML = DateTime.local().plus({ days: nextFullMoonDayIn }).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })

console.log(emojiPhaseArray[b]);
console.log(phaseArray[b]);
console.log(dt.toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' }));
console.log('Next New Moon On: ' + DateTime.local().plus({ days: nextNewMoonDayIn }).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' }))
console.log('Next Full Moon On: ' + DateTime.local().plus({ days: nextFullMoonDayIn }).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' }))