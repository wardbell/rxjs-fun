export class Hero {
  name: string;
  count: number;
}

let count = 0;

/** Update each hero's count as it arrives, so distinguish freshly fetched heroes */
export function heroTouch(heroes: Hero[]) {
  return heroes.map(h => { h.count = count++; return h; });
}
