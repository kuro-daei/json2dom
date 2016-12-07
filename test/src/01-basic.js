const chai = require('chai');
chai.use(require('chai-dom'));
const Json2Dom = require('../../src/main.js');

const expect = chai.expect;

class Ctrl1 {
  tagNameOfPlayer() { return 'div'; } // eslint-disable-line class-methods-use-this
  tagNameOfTome() { return 'div'; } // eslint-disable-line class-methods-use-this
}

class Ctrl2 {
  tagNameOfPlayer() { return 'img'; } // eslint-disable-line class-methods-use-this
  tagNameOfTome() { return 'span'; } // eslint-disable-line class-methods-use-this
}

describe('Basic', () => {
  it('dom check', (done) => {
    const ctl = new Ctrl1();
    const j2d = new Json2Dom(ctl);
    const url = '../data/simple.js';
    j2d.load(url).then((dom) => {
      expect(dom).to.have.attribute('role', 'wrapper');
      expect(dom).to.contain('img[role="loader"]');
      expect(dom).to.contain('img[role="btnClose"]');
      expect(dom).to.contain('div[role="passback"]');
      expect(dom).to.contain('div[role="video"]');
      expect(dom).to.contain('div[role="video"] div[role="player"]');
      expect(dom).to.contain('div[role="video"] div[role="tome"]');
      expect(dom).to.contain('div[role="video"] img[role="btnFull"]');
      expect(dom).to.contain('div[role="video"] img[role="btnDetail"]');
      expect(dom).to.contain('div[role="video"] img[role="btnReplay"]');
      done();
    }).catch((error) => {
      done(error);
    });
  });

  it('dynamic tag', (done) => {
    const ctl = new Ctrl2();
    const j2d = new Json2Dom(ctl);
    const url = '../data/simple.js';
    j2d.load(url).then((dom) => {
      expect(dom).to.contain('div[role="video"] img[role="player"]');
      expect(dom).to.contain('div[role="video"] span[role="tome"]');
      done();
    }).catch((error) => {
      done(error);
    });
  });
});
