import { render, screen, act } from "@testing-library/react";
import { PomodoroTimer } from "./PomodoroTimer";
import { DEFAULT_TIMER_SETTINGS } from "@/app/_config/timerConfig";
import { jest } from "@jest/globals";

// テスト用のデフォルトProps
const defaultProps = {
  isTimerRunning: false,
  handlePhaseComplete: jest.fn(),
  currentPhase: "focus" as const,
  currentCycle: 1,
  remainingTime: 1500, // 25分（秒単位）
  setRemainingTime: jest.fn(),
  timerSettings: DEFAULT_TIMER_SETTINGS,
};

// プログレスバー検証用
const CIRCLE_INDEX = 1;
const DASHARRAY = 301.59; // 円周の長さ
const TOLERANCE = 0.01; // 許容誤差

function getDashoffset(container: HTMLElement): number {
  const circle = container.querySelectorAll("circle")[CIRCLE_INDEX]!;
  return parseFloat(circle.getAttribute("stroke-dashoffset")!);
}

function assertProgress(container: HTMLElement, percent: number) {
  const expected = DASHARRAY * (1 - percent / 100);
  const actual = getDashoffset(container);
  expect(actual).toBeGreaterThanOrEqual(expected - TOLERANCE);
  expect(actual).toBeLessThanOrEqual(expected + TOLERANCE);
}

describe("PomodoroTimer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // FakeTimers の影響をリセット
    jest.useRealTimers();
  });

  test("タイマーが正しくレンダリングされる", () => {
    render(<PomodoroTimer {...defaultProps} />);
    expect(screen.getByText("25:00")).toBeInTheDocument();
    expect(screen.getByText("集中時間")).toBeInTheDocument();
    expect(screen.getByText("1 / 4")).toBeInTheDocument();
  });

  test("残り時間が正しくフォーマットされる", () => {
    const props = { ...defaultProps, remainingTime: 487 };
    render(<PomodoroTimer {...props} />);
    expect(screen.getByText("08:07")).toBeInTheDocument();
  });

  test("フェーズに応じたテキストが表示される", () => {
    const shortProps = {
      ...defaultProps,
      currentPhase: "short-break" as const,
    };
    const { rerender } = render(<PomodoroTimer {...shortProps} />);
    expect(screen.getByText("短い休憩")).toBeInTheDocument();

    const longProps = { ...defaultProps, currentPhase: "long-break" as const };
    rerender(<PomodoroTimer {...longProps} />);
    expect(screen.getByText("長い休憩")).toBeInTheDocument();
  });

  test("残り時間が0になるとhandlePhaseCompleteが呼ばれる", () => {
    const mock = jest.fn();
    const props = {
      ...defaultProps,
      remainingTime: 0,
      handlePhaseComplete: mock,
    };
    render(<PomodoroTimer {...props} />);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test("タイマー実行中は1秒ごとにsetRemainingTimeが呼ばれる", () => {
    jest.useFakeTimers();
    const mockSet = jest.fn((fn) => (typeof fn === "function" ? fn(10) : 10));
    const props = {
      ...defaultProps,
      isTimerRunning: true,
      remainingTime: 10,
      setRemainingTime: mockSet,
    };
    render(<PomodoroTimer {...props} />);
    act(() => jest.advanceTimersByTime(1000));
    expect(mockSet).toHaveBeenCalled();
  });

  test("タイマーが停止中はカウントダウンが行われない", () => {
    jest.useFakeTimers();
    const mockSet = jest.fn();
    const props = {
      ...defaultProps,
      isTimerRunning: false,
      remainingTime: 60,
      setRemainingTime: mockSet,
    };
    render(<PomodoroTimer {...props} />);
    act(() => jest.advanceTimersByTime(2000));
    expect(mockSet).not.toHaveBeenCalled();
  });

  describe("プログレスバーの進捗率", () => {
    const cases = [
      {
        phase: "focus" as const,
        rem: defaultProps.timerSettings.focusTime * 60 * 0.5,
        percent: 50,
        desc: "集中フェーズで50%経過",
      },
      {
        phase: "short-break" as const,
        rem: defaultProps.timerSettings.shortBreakTime * 60 * 0.75,
        percent: 25,
        desc: "短い休憩フェーズで25%経過",
      },
      {
        phase: "long-break" as const,
        rem: defaultProps.timerSettings.longBreakTime * 60 * 0.25,
        percent: 75,
        desc: "長い休憩フェーズで75%経過",
      },
    ];

    cases.forEach(({ phase, rem, percent, desc }) => {
      test(desc, () => {
        const props = {
          ...defaultProps,
          currentPhase: phase,
          remainingTime: rem,
        };
        const { container } = render(<PomodoroTimer {...props} />);
        assertProgress(container, percent);
      });
    });
  });
});
