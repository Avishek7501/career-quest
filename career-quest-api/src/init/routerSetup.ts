import { Express } from 'express';
import fs from 'fs';
import path from 'path';

import { authMiddleware } from '../middlewares/auth';

const routerSetup = (app: Express) => {
    // Define the directory where your routers are located
    const baseRoutersDirectory = path.join(__dirname, '../routers');

    // Read the directories in the base routers directory
    const versionDirectories = fs.readdirSync(baseRoutersDirectory);

    // Iterate through each version directory
    versionDirectories.forEach((versionDirectory) => {
        const versionDirectoryPath = path.join(
            baseRoutersDirectory,
            versionDirectory
        );

        // Check if it's a directory
        if (fs.statSync(versionDirectoryPath).isDirectory()) {
            // Read the files in the version directory
            const routerFiles = fs.readdirSync(versionDirectoryPath);

            // Iterate through each router file and dynamically import and use it
            routerFiles.forEach((routerFile) => {
                // Extract the route name from the file name (remove "Router.ts" extension)
                const baseName = path
                    .basename(routerFile, path.extname(routerFile))
                    .replace('Router', '');

                // Convert camel case or Pascal case file names like "JobCategory" into "job/category"
                const routeName = baseName
                    .replace(/([a-z])([A-Z])/g, '$1/$2') // Split camel case
                    .toLowerCase(); // Convert to lowercase

                // Dynamically import the router module
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const versionedRouter = require(
                    path.join(versionDirectoryPath, routerFile)
                ).default;

                console.log(
                    `Mounting ${versionDirectory}/${routeName} router...`
                );

                // Determine the base path for this route
                const routePath = `/api/${versionDirectory}/${routeName}`;

                // Check if the router is for "auth" (case-insensitive)
                if (routerFile.toLowerCase().includes('auth')) {
                    // Mount without authMiddleware (public route)
                    app.use(routePath, versionedRouter);
                } else {
                    // Mount with authMiddleware (protected route)
                    // app.use(routePath, authMiddleware, versionedRouter);
                    app.use(routePath, versionedRouter);
                }
            });
        }
    });
};

export default routerSetup;
