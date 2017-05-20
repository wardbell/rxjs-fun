import { RxjsFunPage } from './app.po';

describe('rxjs-fun App', () => {
  let page: RxjsFunPage;

  beforeEach(() => {
    page = new RxjsFunPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
