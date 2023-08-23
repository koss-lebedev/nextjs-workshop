import config from "@/common/config";
import { ROUTES } from "@/common/routes";
import session from "@/common/session";
import { requireUser } from "@/modules/auth/service";
import {
  createCredential,
  findCredentialsByUserId,
} from "@/modules/passkeys/service";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { RegistrationResponseJSON } from "@simplewebauthn/typescript-types";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await requireUser();
  const credentials = await findCredentialsByUserId(user.id);

  const options = generateRegistrationOptions({
    rpName: config.hostname,
    rpID: config.hostname,
    userID: user.id,
    userName: user.email,
    attestationType: "none",
    excludeCredentials: credentials.map((c) => ({
      id: isoBase64URL.toBuffer(c.credID),
      type: "public-key",
      transports: c.transports.split(",") as AuthenticatorTransport[],
    })),
    authenticatorSelection: {
      residentKey: "required",
    },
  });

  session.put("challenge", options.challenge);
  return NextResponse.json(options);
};

export const POST = async (request: Request) => {
  const user = await requireUser();

  const expectedChallenge = session.pop("challenge") || "";

  const data = await request.json();
  const { name, ...response } = data as RegistrationResponseJSON & {
    name: string;
  };

  const { verified, registrationInfo } = await verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedOrigin: config.origin,
    expectedRPID: config.hostname,
    requireUserVerification: false,
  });

  if (!verified || !registrationInfo) {
    throw new Error("User verification failed.");
  }

  const { credentialPublicKey, credentialID } = registrationInfo;

  await createCredential({
    userId: user.id,
    credID: isoBase64URL.fromBuffer(credentialID),
    publicKey: isoBase64URL.fromBuffer(credentialPublicKey),
    transports: (response.response.transports ?? []).join(","),
    name,
  });

  return NextResponse.redirect(ROUTES.Passkeys);
};
