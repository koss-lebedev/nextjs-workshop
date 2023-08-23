import crypto from "node:crypto";
import { cookies } from "next/headers";

type SessionMap = {
  [id: string]: {
    [key: string]: string;
  };
};

const SESSION_KEY = "__next-session";

const sessions: SessionMap = {};

const sessionManager = {
  put: (key: string, value: string) => {
    let sessionId = cookies().get(SESSION_KEY)?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      cookies().set(SESSION_KEY, sessionId);
    }

    const session = sessions[sessionId] || {};
    sessions[sessionId] = {
      ...session,
      [key]: value,
    };
  },

  pop: (key: string) => {
    const sessionId = cookies().get(SESSION_KEY)?.value;
    if (!sessionId) {
      return undefined;
    }

    const session = sessions[sessionId];
    if (!session) {
      return undefined;
    }

    const value = sessions[sessionId][key];
    delete sessions[sessionId][key];
    return value;
  },
};

export default sessionManager;
