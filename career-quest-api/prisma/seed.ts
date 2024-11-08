import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'; // Ensure you have faker installed for generating random data

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // Seed 50 job categories
    const jobCategories = await prisma.$transaction(
        Array.from({ length: 50 }).map((_, i) =>
            prisma.jobCategory.create({
                data: {
                    CategoryName: `Category ${i + 1}`,
                    CreatedBy: 1 // Assume an existing admin user ID, replace with an actual user ID if necessary
                }
            })
        )
    );

    console.log('50 job categories created');

    // For each category, seed 1000 job skills
    for (const category of jobCategories) {
        const skillsBatch = Array.from({ length: 1000 }).map(() => ({
            SkillName: faker.person.jobTitle as unknown as string,
            JobCategoryId: category.CategoryId
        }));

        await prisma.jobSkill.createMany({
            data: skillsBatch,
            skipDuplicates: true
        });

        console.log(
            `1000 job skills created for Category ID: ${category.CategoryId}`
        );
    }

    console.log('Seeding completed');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
