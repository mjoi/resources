function wait(seconds) {
  // wait number of seconds
  iimSet("seconds", seconds);
  iimPlay("CODE:WAIT SECONDS=" + seconds);
}
