'use strict';

/**
 * Key.js controller
 *
 * @description: A set of functions called "actions" for managing `Key`.
 */

module.exports = {

  /**
   * Retrieve key records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.key.search(ctx.query);
    } else {
      return strapi.services.key.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a key record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.key.fetch(ctx.params);
  },

  /**
   * Count key records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.key.count(ctx.query);
  },

  /**
   * Create a/an key record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.key.add(ctx.request.body);
  },

  /**
   * Update a/an key record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.key.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an key record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.key.remove(ctx.params);
  }
};
