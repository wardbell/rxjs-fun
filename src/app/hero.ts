export class Hero {
  id: number;
  name: string;
  count: number;
  bio: string;
}

let count = 0;

/** Update each hero's count as it arrives, so distinguish freshly fetched heroes */
export function heroTouch(heroes: Hero[]) {
  return heroes.map(h => { h.count = count++; return h; });
}

export const heroesUrl = 'api/heroes.json';
// export const heroesUrl = 'heroes.json';
