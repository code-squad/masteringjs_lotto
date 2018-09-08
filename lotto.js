
function buylotto(price){
    const entry_chance = Math.floor(price/1000); //생성할 수 있는 횟수
    let lotto = [];

    lotto = lotto.concat(createlotto(entry_chance));
    printresult(entry_chance, lotto);
}

function createlotto(entry_chance){
    let lotto = [];       //랜덤으로 6자리 숫자를 받음
    let singlelotto = []; // lotto 배열에서 중복 숫자 제거
    let resultlotto = []; // 최종 로또

    //숫자 랜덤으로 6자리 생성
    while(resultlotto.length < entry_chance ) {
        let lottoCount = 0;
        while(lottoCount < 6){
            let number = parseInt(Math.random()*45) + 1;
            lotto.push(number);
    
            // 중복 숫자 제거
            singlelotto = lotto.filter((item, idx, array) => {
            return array.indexOf(item) === idx;
            });

            //숫자 정렬
            singlelotto.sort((x, y) => x - y);
    
            // 중복 숫자 제거된 배열의 길이가 6자리 이하일 때 숫자 생성 계속
            if(singlelotto.length < 6) {
                lottoCount = singlelotto.length;
            } else { lottoCount = 6;}
        }
        // 6자리 생성된 숫자를 최종 resultlotto 배열에 삽입
        resultlotto.push(singlelotto);
        
        lottoCount = 0;
        lotto = [];
        singlelotto = [];
    }

    return resultlotto;
}

function comparisonNum(lotto){
    const setLuckyNumber = [1, 2, 3, 4, 5, 6]; // 당첨 로또 숫자
    let luckyNum = 0;              // 맞춘 숫자의 개수
    let checkNum = [];

    // 생성된 로또와 당첨 숫자별로 비교
    for (var i=0; i<lotto.length; i++){
        for(var j=0; j<lotto[i].length; j++){
            if(setLuckyNumber.includes(lotto[i][j])){
                luckyNum += 1;
            }
        }
        // 각 장당 당첨 숫자와 매칭된 숫자 개수를 checkNum 배열에 삽입
        checkNum.push(luckyNum);
        luckyNum = 0;
    }

        const result = {
            winsNum2 : resultNum = checkNum.filter(item => item === 2),
            winsNum3 : resultNum = checkNum.filter(item => item === 3),
            winsNum4 : resultNum = checkNum.filter(item => item === 4),
            winsNum5 : resultNum = checkNum.filter(item => item === 5),
            winsNum6 : resultNum = checkNum.filter(item => item === 6)
        }

    return result;
}

function calculationYield(result, entry_chance){
    let lotto_yield = 0;
    if(result.winsNum6.length === 6) {
        lotto_yield = (entry_chance / result.winsNum6.length) * 100;
    } else {
        lotto_yield = 0;
    }
    return lotto_yield;
}
function printresult(entry_chance, lotto){

    const setLuckyNumber = [1, 2, 3, 4, 5, 6]; // 당첨 로또 숫자
    const result = comparisonNum(lotto);
    const lotto_yield = calculationYield(result, entry_chance);

    console.log("로또 " + entry_chance +"개를 발행했습니다.");
    console.log(lotto);
    console.log("setLuckyNumber("+ setLuckyNumber +")");
    console.log("당첨 통계");
    console.log("------------")

    console.log("2개 일치 (0원)-" + result.winsNum2.length + "장");
    console.log("3개 일치 (5000원)-" + result.winsNum3.length + "장");
    console.log("4개 일치 (50000원)-" + result.winsNum4.length + "장");
    console.log("5개 일치 (150000원)-" + result.winsNum5.length + "장");
    console.log("6개 일치 (2000000000원)-" + result.winsNum6.length + "장");

    console.log("나의 수익률은 " + lotto_yield + "% 입니다.");

}

buylotto(14000);
