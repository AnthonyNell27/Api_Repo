const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "test@example.com";
  const plainPassword = "Password123!";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: "Test User",
    },
  });

  console.log(`Seeded user: ${user.email} / ${plainPassword}`);
}

main()
  .catch((error) => {
    console.error("Seeding error", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

