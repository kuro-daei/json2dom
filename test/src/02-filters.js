const chai = require('chai');
chai.use(require('chai-dom'));
const Json2Dom = require('../../src/main.js');

const expect = chai.expect;

class Ctrl {
  constructor() {
    this.called = [];
  }
  tagNameOfPlayer() { this.called.push('tagNameOfPlayer'); return 'div'; }
  beforePlayerCreate() { this.called.push('beforePlayerCreate'); return true; }
  afterPlayerCreate() { this.called.push('afterPlayerCreate'); return; }
  onBtnFullClick() { this.called.push('onBtnFullClick'); return; }
  beforeTomeCreate() { this.called.push('beforeTomeCreate'); return false; } // not create tome
  tagNameOfTome() { this.called.push('tagNameOfTome'); return 'div'; }
}

describe('Filters', () => {
  it('create filter check', (done) => {
    const ctl = new Ctrl();
    const j2d = new Json2Dom(ctl);
    const url = '../data/simple.js';
    j2d.load(url).then((dom) => {
      expect(ctl.called).to.have.members([
        'tagNameOfPlayer',
        'beforePlayerCreate', 'afterPlayerCreate', 'beforeTomeCreate',
      ]);
      expect(dom).not.to.contain('div[role="tome"]');
      done();
    }).catch((error) => {
      done(error);
    });
  });

  it('click check', (done) => {
    const ctl = new Ctrl();
    const j2d = new Json2Dom(ctl);
    const url = '../data/simple.js';
    j2d.load(url).then((dom) => {
      const btnFull = dom.querySelector('div[role="video"] img[role="btnFull"]');
      expect(ctl.called).not.to.include.members(['onBtnFullClick']);
      btnFull.addEventListener('click', () => {
        expect(ctl.called).to.include.members(['onBtnFullClick']);
        done();
      });
      const clickEvent = new MouseEvent('click', { view: window, bubbles: true, cancelable: false });
      btnFull.dispatchEvent(clickEvent);
    }).catch((error) => {
      done(error);
    });
  });
});
