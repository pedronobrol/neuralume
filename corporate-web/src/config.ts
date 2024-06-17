export const API_URL: string =
    process.env.REACT_APP_API_URL || "https://api.neuralume.com";

const STRIPE_TEST_API_KEY: string =
    "pk_test_51IB6UdJbXjVSLCa48PKE5dJnOXxiuDY4I3eaLucApOmQDkz5U7GxhE6JvqTIRJHKialr4mYGwJda2d6BVSggtVJF00anQksrzQ";
const STRIPE_PROD_API_KEY: string =
    "pk_live_51IB6UdJbXjVSLCa4zjqGEbJcnOwt9meJoCoWzL0K2hCxxd3t2mCqpT0se61vBwwhdWMo2za7gJ0j2URZjFpbtIBc00DyRQTDgp";
const isDevelopmentMode =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";
export const STRIPE_API_KEY: string = isDevelopmentMode
    ? STRIPE_TEST_API_KEY
    : STRIPE_PROD_API_KEY;
