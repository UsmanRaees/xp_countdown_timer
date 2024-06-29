import inquirer from "inquirer"
import {differenceInSeconds} from "date-fns"

const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        messgae: "Please enter the amount of second",
        validate: (input) => {
            if(isNaN(input)) {
                return "Please enter valid number"
            }else if (input >60) {
                return "seconds must be in 60"
            }else {
                return true;
            }
        }
    }
])

let input = res.userInput

function startTime(val:number) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val)
    const intervalTime = new Date(initialTime)
    setInterval((() => {
        const currTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currTime)

        if(timeDiff <= 0) {
            console.log("Time has expired");
            process.exit()
        }

        const min = Math.floor((timeDiff%(3600*24))/3600)
        const sec = Math.floor(timeDiff%60)

        console.log(`${min.toString().padStart(2,"0")}: ${sec}`);
    }),1000)
}

startTime(input)