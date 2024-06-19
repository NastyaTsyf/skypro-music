import formatSeconds from "./formatSeconds";

describe('функция форматирования времени', () => {
    it('правильно форматирует число в строку', () => {
        const result = formatSeconds(6);
        expect(result).toBe("0:06")
    });
    it('правильно правильно форматирует число 0 в строку', () => {
        const result = formatSeconds(0);
        expect(result).toBe("0:00")
    });

  });