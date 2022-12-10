export const getCoefficient = (period: [number, number], zoom: number, cf: number) => {
    let [min, max] = period

    let coefficient = cf

    while (min < max) {
        if (min <= zoom) {
            coefficient = cf / min
        }
        min *= 5
    }

    return coefficient
}
