import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // Seed Users
    const createdUsers = await Promise.all(
        Array.from({ length: 10 }).map((_, i) =>
            prisma.user.create({
                data: {
                    Username: `user${i + 1}`,
                    Email: `user${i + 1}@example.com`,
                    Password: 'password123', // Default password
                    Address: faker.location.streetAddress(),
                    Phone: faker.phone.number(),
                    Gender: i % 2 === 0 ? 'Male' : 'Female'
                }
            })
        )
    );
    console.log(`${createdUsers.length} Users created`);

    // Seed User Followers (random connections)
    const followersData: Prisma.UserFollowerCreateManyInput[] = [];
    createdUsers.forEach((user, index) => {
        const followingUsers = createdUsers
            .filter((_, i) => i !== index)
            .slice(0, 3); // Each user follows 3 others
        followingUsers.forEach((followingUser) => {
            followersData.push({
                FromUserId: user.UserId,
                ToUserId: followingUser.UserId
            });
        });
    });
    await prisma.userFollower.createMany({
        data: followersData,
        skipDuplicates: true
    });
    console.log('User followers created');

    // Seed Job Categories
    const jobCategoriesData = [
        {
            CategoryName: 'Software Development',
            CreatedBy: createdUsers[0].UserId
        },
        { CategoryName: 'Marketing', CreatedBy: createdUsers[0].UserId },
        { CategoryName: 'Data Science', CreatedBy: createdUsers[0].UserId },
        { CategoryName: 'Design', CreatedBy: createdUsers[0].UserId }
    ];

    const createdCategories = await Promise.all(
        jobCategoriesData.map((category) =>
            prisma.jobCategory.create({ data: category })
        )
    );
    console.log(`${createdCategories.length} Job Categories created`);

    // Seed Job Skills for each category
    const jobSkillsData: Prisma.JobSkillCreateManyInput[] = [];
    const skillsByCategory: { [props: string]: Array<string> } = {
        'Software Development': ['JavaScript', 'Python', 'C++', 'Java', 'SQL'],
        Marketing: [
            'SEO',
            'Content Writing',
            'Social Media',
            'Email Marketing',
            'Brand Strategy'
        ],
        'Data Science': [
            'Data Analysis',
            'Machine Learning',
            'Python',
            'R',
            'Statistics'
        ],
        Design: [
            'UI Design',
            'UX Design',
            'Photoshop',
            'Illustrator',
            '3D Modeling'
        ]
    };

    createdCategories.forEach((category) => {
        const skills = skillsByCategory[category.CategoryName].map((skill) => ({
            SkillName: skill,
            JobCategoryId: category.CategoryId
        }));
        jobSkillsData.push(...skills);
    });
    await prisma.jobSkill
        .createMany({
            data: jobSkillsData,
            skipDuplicates: true
        })
        .then(() => {
            console.log('Job skills created');
        });

    // Seed Job Simulations
    let jobSimulations = await Promise.all(
        createdCategories.map((category) =>
            prisma.jobSimulation.create({
                data: {
                    JobCategoryId: category.CategoryId,
                    JobTitle: `${category.CategoryName} Specialist`,
                    JobDescription: `Responsible for tasks in ${category.CategoryName.toLowerCase()} domain.`
                }
            })
        )
    );
    console.log('Job Simulations created');

    // Seed Job Simulation Skills
    const users = await prisma.user.findMany();
    jobSimulations = await prisma.jobSimulation.findMany();
    const jobSkills = await prisma.jobSkill.findMany();
    const jobSimulationSkillsData: Prisma.JobSimulationSkillCreateManyInput[] =
        [];
    jobSimulations.forEach((simulation, index) => {
        const skillsForSimulation = jobSkills.slice(index * 5, index * 5 + 3); // 3 skills per simulation
        skillsForSimulation.forEach((skill) => {
            jobSimulationSkillsData.push({
                JobSimulationId: simulation.JobSimulationId,
                JobSkillId: skill.JobSkillId as number
            });
        });
    });
    await prisma.jobSimulationSkill.createMany({
        data: jobSimulationSkillsData,
        skipDuplicates: true
    });
    console.log('Job Simulation Skills created');

    // Seed Interview Questions
    const questionTypes = ['MCQ', 'True/False'];
    let interviewQuestions = await Promise.all(
        jobSimulations.flatMap((simulation) =>
            Array.from({ length: 5 }).map(() =>
                prisma.interviewQuestion.create({
                    data: {
                        JobSimulationId: simulation.JobSimulationId,
                        QuestionText: faker.lorem.sentence(),
                        QuestionType:
                            questionTypes[
                                Math.floor(Math.random() * questionTypes.length)
                            ]
                    }
                })
            )
        )
    );
    console.log('Interview Questions created');

    // Seed Interview Answers for each question
    // Fetch all interview questions from the database
    interviewQuestions = await prisma.interviewQuestion.findMany();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interviewAnswersData: any = [];

    interviewQuestions.forEach((question) => {
        if (question.QuestionType === 'MCQ') {
            // Generate 4 options for MCQ, one of which is correct
            for (let i = 0; i < 4; i++) {
                interviewAnswersData.push({
                    InterviewQuestionId: question.InterviewQuestionId,
                    Answer: faker.lorem.words(3), // Random answer text
                    IsCorrect: i === 0 // Set the first option as the correct answer
                });
            }
        } else if (question.QuestionType === 'True/False') {
            // Create two options for True/False
            interviewAnswersData.push(
                {
                    InterviewQuestionId: question.InterviewQuestionId,
                    Answer: 'True',
                    IsCorrect: false
                },
                {
                    InterviewQuestionId: question.InterviewQuestionId,
                    Answer: 'False',
                    IsCorrect: true
                }
            );
        }
    });

    // Insert the generated interviewAnswersData into the InterviewAnswer table
    await prisma.interviewAnswer.createMany({
        data: interviewAnswersData,
        skipDuplicates: true
    });

    // Seed Job Applications
    const jobApplicationsData = users.map((user) => ({
        JobSimulationId:
            jobSimulations[Math.floor(Math.random() * jobSimulations.length)]
                .JobSimulationId,
        UserId: user.UserId
    }));
    await prisma.jobApplication.createMany({
        data: jobApplicationsData,
        skipDuplicates: true
    });
    console.log('Job Applications created');

    // Seed Leaderboard Entries
    const leaderboardEntries = users.map((user) => ({
        UserId: user.UserId,
        CurrentScore: faker.number.int({ min: 0, max: 100 }),
        TotalScore: faker.number.int({ min: 0, max: 1000 })
    }));
    await prisma.leaderboard.createMany({
        data: leaderboardEntries,
        skipDuplicates: true
    });
    console.log('Leaderboard entries created for users');

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
