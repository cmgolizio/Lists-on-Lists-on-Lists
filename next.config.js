/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_APP_FIREBASE_API_KEY: "AIzaSyBPls8cykIf8svI8NA49pfcZvomhY-GOhI",
    NEXT_APP_FIREBASE_AUTH_DOMAIN: "todo-too-19fc4.firebaseapp.com",
    NEXT_APP_FIREBASE_DATABASE_URL:
      "https://todo-too-19fc4-default-rtdb.firebaseio.com/",
    NEXT_APP_FIREBASE_PROJECT_ID: "todo-too-19fc4",
    NEXT_APP_FIREBASE_STORAGE_BUCKET: "todo-too-19fc4.appspot.com",
    NEXT_APP_FIREBASE_MESSAGING_SENDER_ID: "367946117685",
    NEXT_APP_FIREBASE_APP_ID: "1:367946117685:web:35920e45ff6d024679377c",
  },
  async redirects() {
    return [
      {
        source: "/mylists",
        destination: "/list/Lists",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
