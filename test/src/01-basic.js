const chai = require('chai');
chai.use(require('chai-dom'));
const Json2Dom = require('../../src/main.js');

const expect = chai.expect;

class Ctrl1 {
  tagNameOfPlayer() { return 'div'; } // eslint-disable-line class-methods-use-this
  tagNameOfTome() { return 'div'; } // eslint-disable-line class-methods-use-this
}

describe('Basic', () => {
  beforeEach(() => {
  });
  it('load success', (done) => {
    const ctl = new Ctrl1();
    const j2d = new Json2Dom(ctl);
    const url = '../data/simple.js';
    j2d.load(url).then((dom) => {
      // expect(dom).to.deep.equal(answer);
      dom.should.contain('div[role="player"]');
      done();
    }).catch((error) => {
      done(error);
    });
  });
});
