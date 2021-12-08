/**
 * @typedef {import('./index.js').Action} Action
 */

import { csrfFetch } from "./csrf.js";

const ADD_BUSINESS = "slurp/businesses/ADD_BUSINESS";
const LOAD_BUSINESSES = "slurp/businesses/LOAD_BUSINESSES";
const REMOVE_BUSINESS = "slurp/businesses/REMOVE_BUSINESS";
const LOAD_REVIEWS = "slurp/businesses/LOAD_REVIEWS";

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
 * Business Review Object
 * @typedef {Object} EditableReviewData
 * @property {number} rating
 * @property {string} comment
 *
 * @typedef {Object} UneditableReviewData
 * @property {number} id
 * @property {number} userId
 * @property {User} user
 * @property {number} businessId
 * @property {string} createdAt
 * @property {string} updatedAt
 *
 * @typedef {EditableReviewData & UneditableReviewData} ReviewData
 *
 * Business Review Response
 * @typedef {Object} ReviewResponse
 * @property {ReviewData[]} reviews
 * @property {number} ratingAvg
 *
 * Business Review
 * @typedef {Object} ReviewProps
 * @property {Record<string, ReviewData>} reviews
 * @property {number} ratingAvg
 *
 * Business with Reviews
 * @typedef {Business & ReviewProps} BusinessWithReviews
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

const loadBusinessReviews = (businessId, reviewData) => {
  return {
    type: LOAD_REVIEWS,
    payload: { businessId, reviewData },
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
 * @param {number | string} businessId
 * @returns {(dispatch: unknown) => Promise<Response>}
 */
export const fetchReviews = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}/reviews`);

  if (res.ok) {
    const reviewData = await res.json();
    dispatch(loadBusinessReviews(businessId, reviewData));
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
    case LOAD_REVIEWS: {
      const newState = {
        ...state,
        entries: { ...state.entries },
      };
      const reviews = {};
      action.payload.reviewData.reviews.forEach((review) => {
        reviews[review.id] = review;
      });

      newState.entries[action.payload.businessId] = {
        ...newState.entries[action.payload.businessId],
        reviews,
        ratingAverage: action.payload.reviewData.ratingAverage,
      };

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

/**
 *
 * @param {number | string} businessId
 * @returns {(state: BusinessesState) => number | undefined}
 */
export const selectBusinessRatingAverage = (businessId) => (state) =>
  state.businesses.entries[businessId]?.ratingAverage;

/**
 *
 * @param {number | string} businessId
 * @returns {(state: BusinessesState) => Record<string, ReviewData> | undefined}
 */
export const selectBusinessReviews = (businessId) => (state) =>
  state.businesses.entries[businessId]?.reviews;
