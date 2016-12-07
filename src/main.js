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
    this.elements = [];
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
    return new Promise((resolve) => {
      new Promise((load, fail) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener('load', () => { load(xhr); }, false);
        xhr.addEventListener('error', (error) => { fail(error); }, false);
        xhr.open('GET', url, true);
        xhr.send();
      }).then((xhr) => {
        if (xhr.status !== 200) {
          throw new Error(`could not get json format - ${xhr.status}`);
        }
        try {
          const o = JSON.parse(xhr.responseText);
          resolve(this.build(o));
        } catch (error) {
          throw new Error(`could not get json format - ${error}`);
        }
      }, (error) => {
        throw new Error(`could not get json format - ${error}`);
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
    this.controllerFunc(`before${capRole}Create`)(json.data, json);
    let type = json.type;
    if (type === 'dynamic') {
      type = this.controllerFunc(`tagNameOf${capRole}`)(json.data, json);
      if (typeof type === 'undefined') {
        throw new Error(`Controller shold have tagNameOf${capRole}()`);
      }
    }
    const elm = document.createElement(type);
    if (elm === null) {
      throw new Error(`${role} can not create any element.`);
    }

    // set attributes
    elm.setAttribute('role', role);
    elm.addEventListener('click', (e) => { this.controllerFunc(`on${capRole}Click`)(e, elm, json.data, json); }, false);

    // set other attributes and child elements
    Object.keys(json).forEach((key) => {
      const value = json[key];
      const re = key.match(/^\$(\w+)/);
      if (re) {
        const childRole = re[1];
        const child = this.myParseJson(value, childRole);
        elm.appendChild(child);
      } else if (key === 'style') {
        elm.cssText = value;
      } else if (key === 'data' || key === 'type') {
        return;
      } else {
        elm.setAttribute(key, value);
      }
    });

    // after create
    this.controllerFunc(`after${capRole}Create`)(elm, json.data, json);
    this.elements[role] = elm;
    return elm;
  }

  /** **************************************************************************
   * controller func
   * @param  {String} funcName controller's function name
   * @return {Function} controller's function
   ****************************************************************************/
  controllerFunc(funcName) {
    return typeof this.ctl[funcName] === 'function' ? this.ctl[funcName] : () => {};
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
