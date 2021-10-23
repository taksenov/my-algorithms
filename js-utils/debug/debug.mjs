/**
 * Рассчет разницы во времени, между началом и окончанием операции
 *
 * @param {bigint} begin
 * @param {bigint} end
 */
export const timeDiff = (begin, end) => (end - begin) / 1000000n;
