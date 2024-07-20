/*
    1. 랜덤번호 지정
    2. 유저가 번호를 입력한 뒤 'Go 버튼'을 누른다
        2-1. 랜덤번호 < 유저번호 == Down
        2-2. 랜덤번호 > 유저번호 == Up
    3. 5번의 기회를 전부 소모하면 게임이 끝이 난다. (버튼 disable)
    4. 'Reset 버튼'을 누르면 게임이 리셋된다.
    
    예외 1. 유저가 1~100 범위 밖 숫자를 입력하면 알려준다.
    예외 2. 유저가 이미 입력한 숫자를 또 입력하면 알려준다.
*/

let playButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("play-button");
let resetButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("reset-button");
let userInput: HTMLInputElement = <HTMLInputElement>document.getElementById("user-input");
let resultArea: HTMLAreaElement = <HTMLAreaElement>document.getElementById("result-area");
let chanceArea: HTMLAreaElement = <HTMLAreaElement>document.getElementById("chance-area");

let computerNum: number = 0;
let userHistory: number[] = [];
let chances = 5;
let gameOver = false;

const pickRandomNum = ():void => {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답: ", computerNum);
};

const play = (): void => {
    let userValue: number = Number(userInput.value);
    console.log("userValue, ", userValue);
    
    if(userValue < 1 || userValue > 100)
    {
        resultArea.textContent = "1 과 100 사이의 숫자를 입력해주세요.";
        return;
    }
    if (userHistory.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }

    chances--;
    userHistory.push(userValue);

    if(userValue < computerNum)
    {
        resultArea.textContent = "Up!!!";
    }
    else if(userValue > computerNum)
    {
        resultArea.textContent = "Down!!!";
    }
    else if(userValue === computerNum)
    {
        resultArea.textContent = "합격!!!";
        playButton.disabled = true;
    }
    
    if(chances <= 0)
        gameOver = true;
    if(gameOver == true)
        playButton.disabled = true

    console.log(userHistory);
    chanceArea.textContent = `남은 기회: ${chances}`;
};

const reset = (): void => {
    //화면을 초기화한다.
    userInput.value = "";
    resultArea.textContent = "결과가 나온다";
    chanceArea.textContent = "남은 기회: 5";
    playButton.disabled = false;
    gameOver = false;
    chances = 5;

    //새로운 번호가 생성된다.
    pickRandomNum();
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", () => userInput.value="");
reset();