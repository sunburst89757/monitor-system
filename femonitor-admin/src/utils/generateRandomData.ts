export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export const generateGrade = () => {
  return random(1, 100);
};
