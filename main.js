import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgYellowBright.bold.cyanBright(`\t><><><><><><><><><><  Wellcome to NBP ATM   ><><><><><><><><><`));
console.log();
console.log(chalk.red(">>>Note:your default ATM Pin Code is: 1234"));
let myBalance = 50000; //Rs
let myPinCode = 1234;
let condition = true;
while (condition) {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: chalk.blue("Please Enter your 4 digit pin code."),
            type: "password",
        },
    ]);
    if ((pinAnswer.pin = myPinCode)) {
        console.log(chalk.bold.bgGreenBright("\t\tWellcome! you are sign in to your ATM."));
        let operationAnswer = await inquirer.prompt([
            {
                name: "operation",
                message: chalk.blueBright("Please select an option below to perform operations."),
                type: "list",
                choices: [
                    "Withdraw",
                    "Fast cash",
                    "Transfer",
                    "Deposit money",
                    "Balance enquiry",
                    "Exit",
                ],
            },
        ]);
        if (operationAnswer.operation === "Withdraw") {
            let amountAnswers = await inquirer.prompt([
                {
                    name: "amount",
                    message: chalk.blue("Please enter the amount you want to withdraw."),
                    type: "number",
                },
            ]);
            if (amountAnswers.amount <= myBalance && amountAnswers.amount > 0) {
                myBalance -= amountAnswers.amount;
                console.log(chalk.greenBright(`You have succefully withdraw an amount of: Rs.${amountAnswers.amount} Your new balance is: Rs.${myBalance}`));
            }
            else {
                console.log(chalk.red("Sorry! You have insufficient balance."));
            }
        }
        else if (operationAnswer.operation === "Balance enquiry") {
            console.log(chalk.greenBright(`Your current balance is: Rs.${myBalance}`));
        }
        else if (operationAnswer.operation === "Fast cash") {
            let selectAnswers = await inquirer.prompt([
                {
                    name: "fastCash",
                    message: chalk.blue("Please select the amount you want to withdraw."),
                    type: "list",
                    choices: [500, 1000, 5000],
                },
            ]);
            if (selectAnswers.fastCash <= myBalance) {
                myBalance -= selectAnswers.fastCash;
                console.log(chalk.greenBright(`You have succfully withdraw an amount of: Rs.${selectAnswers.fastCash} Your new balance is: Rs.${myBalance}`));
            }
            else {
                console.log(chalk.red("sorry! insufficient balance."));
            }
        }
        else if (operationAnswer.operation === "Transfer") {
            let transferAmount = await inquirer.prompt([
                {
                    name: "transfer",
                    message: " please Enter recipient Account number.",
                    type: "input",
                },
                {
                    type: "input",
                    name: "amount",
                    message: "Enter amount to transfer:",
                },
            ]);
            if (transferAmount.amount <= myBalance) {
                myBalance -= transferAmount.amount;
                console.log(chalk.greenBright(`you have transfered an amount of: Rs.${chalk.cyanBright(transferAmount.amount)} to account No ${chalk.cyanBright(transferAmount.transfer)}.Your reamainig balance is: Rs.${chalk.cyanBright(myBalance)}`));
            }
        }
        else if (operationAnswer.operation === "Deposit money") {
            let depositMoney = await inquirer.prompt([
                {
                    name: "selectMoney",
                    message: chalk.blue("Please select the amount you want to deposit in your account."),
                    type: "list",
                    choices: [500, 1000, 5000],
                },
            ]);
            myBalance += depositMoney.selectMoney;
            console.log(chalk.greenBright(`you have succefully deposited an amount of: Rs.${depositMoney.selectMoney} Your new balance is: Rs.${myBalance}`));
        }
        else if (operationAnswer.operation === "Exit") {
            let ExitOperation = await inquirer.prompt([
                {
                    name: "Exit",
                    message: chalk.blue("Do you want to Exit?"),
                    type: "confirm",
                },
            ]);
            if (ExitOperation.Exit == true) {
                break;
            }
            else {
                condition = true;
            }
        }
    }
    else {
        console.log(chalk.redBright("Incorrect pin code please try again."));
    }
}
console.log(chalk.bold.cyanBright("\t>>>>>>>>>>>>>>>>>  Thank You for Using ATM.  <<<<<<<<<<<<<<<<<"));
