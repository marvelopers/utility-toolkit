import { rest } from 'msw';

/**
 * API
 * 각 API는 HTTP handler로 정의되어 있어요. 아래의 handlers와 관련 주석을 확인해주세요.
 */
export function handlers() {
  return [
    /**
     * 현재 세션의 유저 정보를 조회합니다.
     * response: {
     *  name: string; // 고객명
     *  rrn: string; // 하이픈을 포함하는 주민등록번호 6+7자리입니다.
     * }
     */
    rest.get('/api/me', getMe),

    /**
     * 대출한도를 조회합니다.
     * query: {
     *  // wait=no 요청을 받으면 기다리지 않고 바로 리턴합니다.
     *  // wait=no가 아닌 요청을 받으면 조회가 완료될 때까지 기다리며, 약 6~10분정도 소요됩니다. 중간에 타임아웃이 발생할 수 있습니다.
     *  wait?: 'yes' | 'no' = 'yes;
     * }
     */
    rest.get('/api/loan-limit', getLoanLimit),

    /**
     * 마지막으로 요청한 대출한도 조회가 완료되었는지 확인합니다.
     * response: {
     *  hasFinished: boolean;
     * }
     */
    rest.get('/api/loan-limit/progress', getLoanLimitCheckProgress),

    /**
     * 가능한 대출설정을 조회합니다.
     * response: {
     *  // 설정 가능한 대출금액 구간. 단위 (원)
     *  range: {
     *   min: number; // 최소
     *   max: number; // 최대
     *  },
     *  durations: number[]; // 대출환급 개월수
     * }
     *
     */
    rest.get('/api/loan-options', getLoanOptions),

    /**
     * 대출이율을 조회합니다.
     * query: {
     *  amountWon: number; // 1000원에 대한 대출이율을 확인한다면 amountWon=1000
     * }
     * response: {
     *  durationStartingAmountWon: number; // 대출이율이 적용되는 구간의 시작 대출금액 (단위: 원)
     *  interest1000: number; // 대출이율. 소수점 세자리까지 정수로 표현하는 값입니다. 1.8%은 18로 입력되게 됩니다.
     * }
     * - 경우에 따라서는 최대 800ms까지 소요될 수 있습니다.
     */
    rest.get('/api/loan-options/interest', queryLoanInterest),
  ];
}

const getMe: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      name: '김토스',
      rrn: '840218-2813218',
    })
  );
};

const getLoanLimit: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  let wait = req.url.searchParams.get('wait');
  if (wait !== 'no') {
    wait = 'yes';
  }

  try {
    startNewLimitCheck();

    if (wait === 'yes') {
      await Promise.race([waitLastLimitCheck, timeout(minutes(7)), timeoutError(minutes(0.5))]);
    }

    return res(ctx.status(200));
  } catch {
    return res(ctx.status(500));
  }
};
const getLoanLimitCheckProgress: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      hasFinished: hasLimitCheckFinished,
    })
  );
};

let waitLastLimitCheck: Promise<boolean> | undefined = undefined;
let hasLimitCheckFinished = false;
function startNewLimitCheck() {
  hasLimitCheckFinished = false;
  waitLastLimitCheck = new Promise(resolve => setTimeout(resolve, seconds(5)));
  waitLastLimitCheck.then(() => (hasLimitCheckFinished = true));
}
function seconds(s: number) {
  return s * 1000;
}
function minutes(m: number) {
  return m * seconds(60);
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function timeoutError(ms: number) {
  return new Promise((_, reject) => setTimeout(reject, ms));
}

function millions(v: number) {
  return v * 1000000;
}

const getLoanOptions: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      range: { min: millions(10), max: millions(300) },
      durations: [15, 20, 30],
    })
  );
};
const queryLoanInterest: Parameters<typeof rest.get>[1] = async (req, res, ctx) => {
  const raw = req.url.searchParams.get('amountWon');
  if (raw == null) {
    return res(ctx.status(400));
  }
  const amountWon = Number(raw);
  if (isNaN(amountWon)) {
    return res(ctx.status(400));
  }
  if (amountWon == null) {
    return res(ctx.status(400));
  }
  if (amountWon < 0 || amountWon > MAX_AMOUNT_WON) {
    return res(ctx.status(400));
  }

  let durationStartingAmountWon = millions(10);
  let interest1000 = 18;
  if (amountWon >= millions(115)) {
    durationStartingAmountWon = millions(115);
    interest1000 = 20;
  }
  if (amountWon >= millions(200)) {
    durationStartingAmountWon = millions(200);
    interest1000 = 35;
  }
  if (amountWon > millions(250)) {
    durationStartingAmountWon = millions(250);
    interest1000 = 50;
  }

  await timeout(300 + Math.random() * 500);

  return res(
    ctx.status(200),
    ctx.json({
      durationStartingAmountWon,
      interest1000,
    })
  );
};

const MAX_AMOUNT_WON = 400000000;
