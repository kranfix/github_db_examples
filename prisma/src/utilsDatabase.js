const { EntityKind, PrismaClient } = require("@prisma/client");
const argon2 = require("argon2");
const jose = require("jose");
const secretJWT = process.env.SECRET_JWT;
const secret = new TextEncoder().encode(secretJWT);
const alg = "HS256";

const prisma = new PrismaClient();

async function generateToken({ name, email }) {
  const result = await new jose.SignJWT({ name, email })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(email)
    .setAudience(email)
    .setExpirationTime("5h")
    .sign(secret);
  return result;
}

async function signUp({ name, email, password }) {
  const user = await getUserByEmail(email);
  if (user) {
    return {
      success: false,
      message: "Email already registered",
      data: {},
    };
  }
  const salt = "salt";
  const hashedPw = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      name,
      email: {
        create: {
          email,
        },
      },
      entity: {
        create: {
          type: EntityKind.USER,
        },
      },
      hashedPw,
      salt,
    },
  });

  const token = await generateToken({ name, email });

  return {
    success: true,
    message: "Successfull signup",
    data: {
      id: newUser.entityId,
      name,
      email,
      token,
    },
  };
}

async function hashPassword(password) {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const Email = await prisma.email.findUnique({
      where: { email: email },
    });

    const user = await prisma.user.findUnique({
      where: { entityId: Email.userId },
    });
    return user;
  } catch {
    return null;
  }
}

async function verifyPassword(storedHash, enteredPassword) {
  try {
    const passwordIsValid = await argon2.verify(storedHash, enteredPassword);
    return passwordIsValid;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}

async function login({ email, password }) {
  let success = false,
    message,
    data = {};
  const user = await getUserByEmail(email);
  if (!user) {
    message = "Invalid credentials";
  } else if (await verifyPassword(user.hashedPw, password)) {
    success = true;
    message = "Login successfull";
    const token = await generateToken({ name: user.name, email });
    data = {
      id: user.entityId,
      name: user.name,
      email,
      token,
    };
  } else {
    message = "Invalid credentials";
  }
  return { success, message, data };
}

async function createRepo({ repo, email, token }) {
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
      issuer: email,
      audience: email,
    });
    console.log(protectedHeader);
    console.log(payload);
    return "new repo created";
  } catch {
    return "wrong token";
  }
}

module.exports = { signUp, login, createRepo };
