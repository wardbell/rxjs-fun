// tslint:disable:quotemark
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class DemoData implements InMemoryDbService {
  createDb() {

    const heroes = [
      { "id": 1, "name": "Magneta",  "count": 1, "bio": "A truly magnetic personality." },
      { "id": 2, "name": "Bombasto", "count": 1, "bio": "Careful how you speak to him."},
      { "id": 3, "name": "Voltana",  "count": 1, "bio": "She\"s shockingly nice." }
    ];

    const villains = [
      { "id": 10, "name": "Flame On" },
      { "id": 11, "name": "Sky Higher" },
      { "id": 12, "name": "Dr. No No" },
      { "id": 13, "name": "Blast O Liam" },
      { "id": 14, "name": "Al Capone" }
    ];

    return {heroes, villains};
  }
}
