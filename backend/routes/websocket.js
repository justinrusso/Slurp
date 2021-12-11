const { v4: uuidv4 } = require("uuid");

let instance = null;

class WebSocketManager {
  businessSubscribers = new Map();

  constructor() {
    if (instance) {
      throw new Error("Cannot create another instance");
    }
  }

  /**
   *
   * @returns {WebSocketManager}
   */
  static getInstance() {
    if (!instance) {
      instance = new WebSocketManager();
    }
    return instance;
  }

  /**
   *
   * @param {import('ws')} ws
   * @param {import('express').Request} req
   * @returns {void}
   */
  webSocketHandler(ws, req) {
    const id = uuidv4();
    ws.on("message", (rawMessage) => {
      let message;
      try {
        message = JSON.parse(rawMessage);
      } catch {
        return;
      }
      if (!message) {
        return;
      }
      console.log(id, "sent message", message);
    });
  }
}

module.exports = {
  WebSocketManager,
};
