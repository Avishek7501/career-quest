const IS_IN_PRODUCTION_MODE = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const BASE_DEPLOY_PATH = process.env.BASE_DEPLOY_PATH ?? '';

const environments = {
    // build-time configs
    BASE_DEPLOY_PATH,

    // api host configs
    API_ENDPOINT_HOST: process.env.NEXT_PUBLIC_API_ENDPOINT_HOST,

    // internal configs
    IS_IN_PRODUCTION_MODE,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV ?? 'development',
    IS_REDUX_LOGGER_DISABLED: false
};

export default environments;
