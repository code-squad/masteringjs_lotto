const { LOTTO, PRIZE } = require('./constant.js');

/**
 * 제네레이터로 사용될 함수
 *
 * @param {number} max: 루프 길이
 * @param {function} fn: 적용될 내부 함수
 * @param {number} args: 내부 함수에 사용될 매개변수
 */
const gen = function*(max, fn, ...args) {
  let cursor = 0;

  while (cursor < max) {
    yield fn(...args);
    cursor++;
  }
};

/**
 * MDN에서 참조: min (포함) 과 max (포함) 사이의 임의 정수를 반환
 *
 * @param {number} min: 로또 최소 단위 숫자
 * @param {number} max: 로또 최대 단위 숫자
 * @return {number} 임의의 정수
 */
const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * 두 배열 비교
 *
 * @param {array} userLuckyArr: 구매 로또 배열
 * @param {array} genLuckyArr: 생성 로또 배열
 * @return {array} 당첨 번호로 이루어진 배열
 */
const matchNumber = (userLuckyArr, genLuckyArr) => userLuckyArr.filter((item) => genLuckyArr.includes(item));

/**
 * 로또를 생성 제네레이터 객체
 *
 * @param {number} buyLottoCount: 구매된 로또 개수
 * @param {number} min: 로또 최소 단위 숫자
 * @param {number} max: 로또 최대 단위 숫자
 * @return {object} 로또 제네레이터 객체
 */
const generatorLuckyNumber = (buyLottoCount, min, max) => gen(buyLottoCount, getRandomIntInclusive, min, max);

/**
 * 다수의 로또를 생성 가능
 *
 * @param {number} buyLottoCount: 구매된 로또 개수
 * @return {array} 생성된 로또들을 가진 배열
 */
const getLuckyNumber = function(buyLottoCount, min, max) {
  return [...generatorLuckyNumber(buyLottoCount, min, max)];
};

/**
 * 묶음 로또 생성 제네레이터 객체
 *
 * @param {number} buyLottoCount: 구매된 로또 개수
 * @param {number} min: 로또 최소 단위 숫자
 * @param {number} max: 로또 최대 단위 숫자
 * @return {object} 생성된 로또 묶음 제네레이터 객체
 */
const generatorLotto = (buyLottoCount, { EA, MIN, MAX }) => gen(buyLottoCount, getLuckyNumber, EA, MIN, MAX);

/**
 * 로또 발행 후 문자열 출력
 *
 * @param {number} buyLottoCount: 구매된 로또 개수
 * @return {string} 발행된 로또 정보 프린트
 */
const getPrintLotto = function(buyLottoCount, LOTTO) {
  return [...generatorLotto(buyLottoCount, LOTTO)].reduce((acc, cur, index) => {
    return (
      `${acc}` +
      `
    [${cur}]`
    );
  }, `로또 ${buyLottoCount}개를 발행했습니다.`);
};

/**
 * 로또 발행 후 문자열 출력
 *
 * @param {number} prizeCount: 당첨 번호 개수
 * @return {string} 로또 당첨 통계와 당첨 정보 문자열 출력
 */
const getPrintPrize = function(prizeInfo, prizeCount = 0, lottoPrice) {
  const prizeKeys = Object.keys(prizeInfo);
  const getPrizeMoneyByIndex = (val) => Object.values(prizeInfo)[val];
  const accumulatePrizeMoney = prizeInfo[prizeCount] || 0;
  const profitRate = (accumulatePrizeMoney / lottoPrice) * 100;

  return (
    prizeKeys.reduce(
      (acc, cur, index) => {
        const prizeMoney = getPrizeMoneyByIndex(index);

        return (
          acc +
          `
        ${cur}개 일치 (${prizeMoney}원)- ${cur === prizeCount ? prizeCount : '0'}개`
        );
      },
      `당첨 통계
      ---------`,
    ) +
    `
      나의 수익률은 ${profitRate}%입니다`
  );
};

/**
 * 요구사항으로 제공되는 로또 구매 함수
 *
 * @param {number} inputMoney: 사용자 입력 금액
 * @return {string} 로또 발행 정보와 발행된 로또 문자열 출력
 */
const buyLottos = function(inputMoney) {
  const buyLottoCount = inputMoney / LOTTO.PRICE;

  return getPrintLotto(buyLottoCount, LOTTO);
};

/**
 * 요구사항으로 제공되는 로또 당첨 함수
 *
 * @param {array} userLuckyArr: 사용자 입력 번호
 * @return {string} 로또 당첨 통계와 당첨 정보 문자열 출력
 */
const setLuckyNumber = function(userLuckyArr) {
  const genLuckyArr = getLuckyNumber(LOTTO.EA);
  const prizeCount = matchNumber(userLuckyArr, genLuckyArr).length;

  return getPrintPrize(PRIZE, prizeCount, LOTTO.PRICE);
};

console.log(buyLottos(3000));
console.log(setLuckyNumber([1, 2, 3, 4, 5, 6]));
