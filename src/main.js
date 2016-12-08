/**
 * Vast manager
 * @author Eiji Kuroda
 * @license MIT
 */

/** ****************************************************************************
 JSON 2 DOM
*******************************************************************************/
class Json2Dom {

  /** **************************************************************************
  * @param  {Object} ctl Controller which will recive call backs.
   ****************************************************************************/
  constructor(ctl) {
    this.ctl = ctl;
    this.elements = {};
  }

  /** **************************************************************************
   * build from json object
   * @param  {Object} json json data
   * @return {DOM} builded dom
   ****************************************************************************/
  build(json) {
    let elm = null;
    Object.keys(json).forEach((key) => {
      const value = json[key];
      const re = key.match(/^\$(\w+)/);
      if (re) {
        const role = re[1];
        elm = this.myParseJson(value, role);
        return;
      }
    });
    return elm;
  }

  /** **************************************************************************
   * load from json url
   * @param  {String} url json url
   * @return {Promise} possible to wait beacon finished
   ****************************************************************************/
  load(url) {
    return new Promise((resolve, reject) => {
      new Promise((load, fail) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener('load', () => { load(xhr); }, false);
        xhr.addEventListener('error', (error) => { fail(error); }, false);
        xhr.open('GET', url, true);
        xhr.send();
      }).then((xhr) => {
        if (xhr.status !== 200) {
          reject(`could not get json format - ${xhr.status}`);
        }
        try {
          const o = JSON.parse(xhr.responseText);
          resolve(this.build(o));
        } catch (error) {
          reject(`could not get json format - ${error}`);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /** **************************************************************************
   * parse json
   * @param  {Object} json json data
   * @param  {String} role target role
   * @return {DOM} builded dom
   ****************************************************************************/
  myParseJson(json, role) {
    const capRole = Json2Dom.capitalization(role);

    // create element
    if (this.ctlFunc(`before${capRole}Create`, { data: json.data, json }) === false) {
      return null;
    }
    let elm;
    if (json.type === 'dynamic') {
      elm = this.ctlFunc(`dynamic${capRole}Create`, { data: json.data, json });
    } else {
      elm = document.createElement(json.type);
    }
    if (typeof elm === 'undefined') {
      throw new Error(`${role} can not create any element.`);
    }

    // set attributes
    elm.setAttribute('role', role);
    elm.addEventListener('click', (e) => { this.ctlFunc(`on${capRole}Click`, { event: e, elm, data: json.data, json }); }, false);

    // set other attributes and child elements
    Object.keys(json).forEach((key) => {
      const value = json[key];
      const re = key.match(/^\$(\w+)/);
      if (re) {
        const childRole = re[1];
        const child = this.myParseJson(value, childRole);
        if (child) {
          elm.appendChild(child);
        }
      } else if (key === 'style') {
        elm.style.cssText = value;
      } else if (key === 'data' || key === 'type') {
        return;
      } else {
        elm.setAttribute(key, value);
      }
    });

    // after create
    this.ctlFunc(`after${capRole}Create`, { data: json.data, json });
    this.elements[role] = elm;
    return elm;
  }

  /** **************************************************************************
   * controller func
   * @param  {String} funcName controller's function name
   * @param  {Object} option parameter option
   * @return {Something} return function value;
   ****************************************************************************/
  ctlFunc(funcName, option) {
    if (typeof this.ctl[funcName] === 'function') {
      return this.ctl[funcName](option);
    }
    return null;
  }

  /** **************************************************************************
   * capitalization
   * @param  {String} str source string
   * @return {String} capitalized string
   ****************************************************************************/
  static capitalization(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

module.exports = Json2Dom;
