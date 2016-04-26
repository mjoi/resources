function randWait() {
  // wait random # of seconds between 2 and 6
  iimSet("seconds", Math.floor((Math.random() * 4) + 2));
  iimPlay("CODE:WAIT SECONDS=" + seconds);
}
