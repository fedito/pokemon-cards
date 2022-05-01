export const hpIsValid = (hp: string) => {
    if ((Number(hp) % 10) != 0) {
        throw new Error(`Hp : ${hp} must be multiple of 10`);
    }
}
