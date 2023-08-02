const { EntityKind, PrismaClient } = require("@prisma/client");
const argon2 = require("argon2");

const prisma = new PrismaClient();

async function signUp({ name, email, password }) {
  const salt = "salt";
  const hashedPw = await hashPassword(password);

  const user = await prisma.user.create({
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
  console.log(user);
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
  const user = await getUserByEmail(email);
  return user ? verifyPassword(user.hashedPw, password) : false;
}

async function createRepo() {}

async function main() {
  const result = await login({
    email: "marcods@gmail.com",
    password: "secret_marcosq",
    //name: "Marcos",
  });
  console.log("result:", result);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
