declare module "d3-scale" {
  export function scaleLinear<T = number, R = number>(): ScaleLinear<T, R>;

  interface ScaleLinear<T, R> {
    domain(domain: T[]): this;
    range(range: R[]): this;
    (value: T): R;
  }
}
