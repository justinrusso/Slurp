/**
 * @typedef {import('./index.js').Action} Action
 */

import { csrfFetch } from "./csrf.js";

const LOAD_BUSINESSES = "slurp/businesses/LOAD_BUSINESSES";

/**
 * Business type definition
 * @typedef {Object} Business
 * @property {number} id
 * @property {number} ownerId
 * @property {string} name
 * @property {string} [description]
 * @property {string} address
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {string} lat
 * @property {string} long
 * @property {string} [displayImage]
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Businesses state
 * @typedef {Object} BusinessesState
 * @property {Object.<string, Business>} entries
 */

/** @type {BusinessesState} */
const initialState = {
  entries: {},
};

/**
 *
 * @param {Business[]} businesses
 * @returns {Action}
 */
const loadBusinesses = (businesses) => {
  return {
    type: LOAD_BUSINESSES,
    payload: businesses,
  };
};

export const fetchBusinesses = () => async (dispatch) => {
  const res = await csrfFetch("/api/businesses");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadBusinesses(data));
    return res;
  }
};

/**
 *
 * @param {BusinessesState} state
 * @param {Action} action
 * @returns {BusinessesState}
 */
export const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUSINESSES: {
      const entries = {};
      action.payload.forEach((business) => {
        entries[business.id] = business;
      });
      return {
        ...state,
        entries,
      };
    }
    default:
      return state;
  }
};

/**
 *
 * @param {number | string} businessId
 * @returns {(state: BusinessesState) => Business=}
 */
export const selectBusiness = (businessId) => (state) =>
  state.businesses.entries[businessId];
