// src/lib/lemmy/postToLemmy.ts

interface LemmyPost {
    name: string;              // Title of the post
    body?: string;            // Optional body text/description
    url?: string;             // URL to the article
    nsfw?: boolean;           // Whether the post is NSFW
    language_id?: number;     // Language ID (1 for English)
    community_id: number;     // The ID of the community to post to
  }
  
  interface LemmyAuth {
    jwt?: string;             // JWT token after login
  }
  
  export async function postToLemmy(article: {
    header: string;
    subhead: string;
    articleUrl: string;
    articleBody: string[] | string;
  }) {
    const LEMMY_INSTANCE = 'https://lemmy.world';
    const COMMUNITY_ID = process.env.LEMMY_COMMUNITY_ID;
    const USERNAME = process.env.LEMMY_USERNAME;
    const PASSWORD = process.env.LEMMY_PASSWORD;
  
    if (!COMMUNITY_ID || !USERNAME || !PASSWORD) {
      throw new Error('Missing Lemmy credentials in environment variables');
    }
  
    try {
      // First, login to get JWT token
      const loginResponse = await fetch(`${LEMMY_INSTANCE}/api/v3/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username_or_email: USERNAME,
          password: PASSWORD,
        }),
      });
  
      if (!loginResponse.ok) {
        throw new Error('Failed to login to Lemmy');
      }
  
      const auth: LemmyAuth = await loginResponse.json();
  
      if (!auth.jwt) {
        throw new Error('No JWT token received from Lemmy');
      }
  
      // Prepare the post data
      const post: LemmyPost = {
        name: article.header,
        body: article.subhead,
        url: `https://isglitch.com/article/${article.articleUrl}`,
        community_id: parseInt(COMMUNITY_ID),
        language_id: 1,  // English
        nsfw: false
      };
  
      // Create the post
      const createPostResponse = await fetch(`${LEMMY_INSTANCE}/api/v3/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.jwt}`,
        },
        body: JSON.stringify(post),
      });
  
      if (!createPostResponse.ok) {
        throw new Error('Failed to create post on Lemmy');
      }
  
      const result = await createPostResponse.json();
      return result;
  
    } catch (error) {
      console.error('Error posting to Lemmy:', error);
      throw error;
    }
  }