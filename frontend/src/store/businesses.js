/**
 * @typedef {import('./index.js').Action} Action
 */

import { csrfFetch } from "./csrf.js";

const ADD_BUSINESS = "slurp/businesses/ADD_BUSINESS";
const LOAD_BUSINESSES = "slurp/businesses/LOAD_BUSINESSES";
const REMOVE_BUSINESS = "slurp/businesses/REMOVE_BUSINESS";

/**
 * Editable business properties
 * @typedef {Object} EditableBusinessData
 * @property {string} name
 * @property {string} [description]
 * @property {string} address
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {string} lat
 * @property {string} long
 * @property {string} [displayImage]
 *
 * @typedef {Object} UneditableBusinessData
 * @property {number} id
 * @property {number} ownerId
 * @property {string} createdAt
 * @property {string} updatedAt
 *
 * Business type definition
 * @typedef {UneditableBusinessData & EditableBusinessData} Business
 *
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

const addOneBusiness = (business) => {
  return {
    type: ADD_BUSINESS,
    payload: business,
  };
};

const removeBusiness = (businessId) => {
  return {
    type: REMOVE_BUSINESS,
    payload: businessId,
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
 * @param {number | string} businessId
 * @returns {(dispatch: unknown) => Promise<Response>}
 */
export const fetchBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`);

  if (res.ok) {
    const business = await res.json();
    dispatch(addOneBusiness(business));
  }
  return res;
};

/**
 *
 * @param {EditableBusinessData} data
 * @returns {(dispatch: unknown) => Promise<Response>}
 */
export const createNewBusiness = (data) => async (dispatch) => {
  const res = await csrfFetch("/api/businesses", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const business = await res.json();
    dispatch(addOneBusiness(business));
  }
  return res;
};

/**
 *
 * @param {number | string} businessId
 * @param {EditableBusinessData} data
 * @returns {(dispatch: unknown) => Promise<Response>}
 */
export const updateBusiness = (businessId, data) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const business = await res.json();
    dispatch(addOneBusiness(business));
  }
  return res;
};

/**
 *
 * @param {number | string} businessId
 * @returns {(dispatch: unknown) => Promise<Response>}
 */
export const deleteBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const { id } = await res.json();
    dispatch(removeBusiness(id));
  }
  return res;
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
    case ADD_BUSINESS: {
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.id]: action.payload,
        },
      };
    }
    case REMOVE_BUSINESS: {
      const newState = {
        ...state,
        entries: { ...state.entries },
      };
      delete newState.entries[action.payload];
      return newState;
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
