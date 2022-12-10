const chalk = require("chalk");

console.log(chalk.green.bold.underline("Game guess number is started"));

const readLine = require("readline").createInterface({
  output: process.stdout,
  input: process.stdin,
});
let count = 1;
const randomNumber = String(Math.round(Math.random() * 10));
const tryLimit = 3;

const game = () => {
  if (tryLimit >= count) {
    readLine.question(chalk.yellow("Please enter the random number to guess\n"), number => {
      if (number === randomNumber) {
        console.log(chalk.bgGreen.bold("Congrats, you guess number"));
        readLine.close();
      } else if (number > randomNumber) {
        console.log(chalk.red("your number is bigger, please try again"));
        count += 1;
        game();
      } else {
        console.log(chalk.red("your number is smaller, please try again"));
        count += 1;
        game();
      }
    });
  } else {
    console.log(chalk.red.bold("Game over"));
    readLine.close();
  }
};

game();
