
// require dependencies
const Helper = require('helper');

/**
 * build route helper class
 */
class RouterHelper extends Helper {
  /**
   * construct datagrid helper
   */
  constructor() {
    // run super
    super();

    // set private variables
    this._creates = [];
    this._updates = [];
    this._removes = [];

    // bind methods
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);

    // bind private methods
    this._hook = this._hook.bind(this);

    // bind super private methods
    this.__match = this.__match.bind(this);

    // listen to eden
    this.eden.post('eden.routes', this._hook);
  }

  /**
   * creates route
   *
   * @param {Object} route
   */
  create(route) {
    // push route
    this._creates.push(route);
  }

  /**
   * updates route
   *
   * @param {Object} route
   */
  update(route) {
    // push route
    this._updates.push(route);
  }

  /**
   * removes route
   *
   * @param {Object} route
   */
  remove(route) {
    // push route
    this._removes.push(route);
  }

  /**
   * runs hook
   *
   * @param {Array} routes
   *
   * @private
   */
  _hook(routes) {
    // loop updates
    for (let a = 0; a < this._creates.length; a++) {
      // add to routes
      routes.push(this._creates[a]);
    }

    // loop updates
    for (let b = 0; b < this._updates.length; b++) {
      // find match
      if (this.__match(this._updates[b], routes)) continue;

      // add to routes
      routes.push(this._updates[b]);
    }

    // loop removes
    for (let c = 0; c < this._updates.length; c++) {
      // find match
      const match = this.__match(this._updates[c], routes);

      // check match
      if (match === -1) continue;

      // splice out match
      routes.splice(match, 1);
    }
  }

  /**
   * matches route
   *
   * @param {Object} route
   * @param {Array}  routes
   *
   * @private
   */
  __match(route, routes) {
    // loop routes
    for (let i = 0; i < routes.length; i++) {
      // check mount and route
      if (route.path !== routes[i].path) continue;
      if (route.mount !== routes[i].mount) continue;
      if (route.method !== routes[i].method) continue;

      // return match
      routes[i] = route;

      // return i
      return i;
    }

    // return -1
    return -1;
  }
}

/**
 * export built route helper
 *
 * @return {RouterHelper}
 */
exports = module.exports = new RouterHelper();
