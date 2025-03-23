## Inspiration
On March 21, 2025, less than 24 hours before BeachHacks, one of our teammates was rushed to the emergency room, unconscious after eating a noodle dish they thought was peanut-free. Doctors later told us they were just _minutes_ away from losing their life. This terrifying experience reminded us how unpredictable and dangerous food allergies can be, especially when ingredients are unclear or mislabeled. It inspired us to build a tool that empowers people with allergies to make safer food choices instantly, accurately, and from anywhere.

## What it does
BiteSafe is a mobile app that allows users to instantly scan food items and restaurant menus to detect potential allergens based on their personal allergy profile. By leveraging AI-powered image recognition and natural language processing, BiteSafe identifies common allergens like peanuts, dairy, gluten, soy, shellfish, and more, helping users make safe dining decisions in real time.

## How we built it
**Figma Design** - All screens, components, and navigation were designed in Figma initially.
**React Native** - Frontend components and navigation.
**Supabase** - User authentication, Ray-Ban Meta scanning storage.
**OpenAI API** - Used to scrape food items, ingredients, and potential allergens.
**Google Gemini API** - Restaurant data caching.
**Ray-Ban Metas** - Convenient menu scanning.

## Challenges we ran into
For all of us, this was our first experience building with React Native. We found it difficult to integrate API calls with Google Gemini and OpenAI API within the Expo environment. We also found it difficult to fetch the camera input from the Ray-Ban Meta smart glasses, as there is no official SDK, forcing us to do a hacky workaround using Facebook Messenger.

## Accomplishments that we're proud of
We are extremely proud of the fact that we were able to deliver a fully functional mobile app that anybody could take along with them to restaurants. We wanted to spread the message that food allergies aren't just an inconvenience, but something that deserves more awareness, understanding, and solutions.

## What We Learned
BeachHacks was 3/4 of our teams' first hackathon. We learned a lot about developing mobile apps with React Native, storing data in databases, and we were able to gain a deeper understanding of API calling.

## What's next for BiteSafe
We plan to publish BiteSafe to the App Store for people with food allergies who need a quick, reliable way to identify potential allergens in their meals. We also plan to expand its features to support more languages, integrate barcode scanning, and improve its AI accuracy using real user feedback.
