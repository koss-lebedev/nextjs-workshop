import { findCredentialByCredId } from "@/modules/passkeys/service";
import {
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import {
  AuthenticationResponseJSON,
  AuthenticatorTransportFuture,
} from "@simplewebauthn/typescript-types";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { issueJWT } from "@/common/jwt";
import session from "@/common/session";
import config from "@/common/config";

export const GET = async () => {
  const options = generateAuthenticationOptions({
    rpID: config.hostname,
    allowCredentials: [],
  });

  session.put("challenge", options.challenge);

  return NextResponse.json(options);
};

export const POST = async (request: Request) => {
  const response = (await request.json()) as AuthenticationResponseJSON;

  const expectedChallenge = session.pop("challenge") || "";

  const cred = await findCredentialByCredId(response.id);
  if (!cred) {
    throw new Error("Credential not found.");
  }

  const { verified } = await verifyAuthenticationResponse({
    response,
    expectedChallenge,
    expectedOrigin: config.origin,
    expectedRPID: config.hostname,
    authenticator: {
      credentialPublicKey: isoBase64URL.toBuffer(cred.publicKey),
      credentialID: isoBase64URL.toBuffer(cred.id),
      transports: cred.transports.split(",") as AuthenticatorTransportFuture[],
    },
    requireUserVerification: false,
  });

  if (!verified) {
    throw new Error("User verification failed.");
  }

  const accessToken = await issueJWT(cred.user.email, 36000 /* 10h */);
  cookies().set("accessToken", accessToken);

  return NextResponse.json({});
};
