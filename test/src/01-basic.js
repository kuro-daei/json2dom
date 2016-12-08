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
      const player = dom.querySelector('div[role="video"] div[role="player"]');
      expect(player.style.width).to.equal('100%');
      expect(player.style.height).to.equal('100%');
      expect(player.style.position).to.equal('absolute');
      expect(player.style.margin).to.equal('auto');
      expect(player.style.top).to.equal('1px');
      expect(player.style.bottom).to.equal('2px');
      expect(player.style.left).to.equal('3px');
      expect(player.style.right).to.equal('4px');
      expect(player.style.objectFit).to.equal('contain');
      document.getElementById('target').appendChild(dom);
      expect(Object.keys(j2d.elements)).to.have.lengthOf(10);
      expect(j2d.elements.player).to.equal(dom.querySelector('div[role="video"] div[role="player"]'));
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

  it('json not found', (done) => {
    const ctl = new Ctrl2();
    const j2d = new Json2Dom(ctl);
    const url = '../data/simple_notfound.js';
    j2d.load(url).then(() => {
      done('expect to catch error.');
    }).catch(() => {
      done();
    });
  });

  it('bad json', (done) => {
    const ctl = new Ctrl2();
    const j2d = new Json2Dom(ctl);
    const url = '../data/bad_json.js';
    j2d.load(url).then(() => {
      done('expect to catch error.');
    }).catch(() => {
      done();
    });
  });
});
