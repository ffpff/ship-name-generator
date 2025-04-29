# Ship Name Generator

A web application that generates unique and creative ship names based on user input. Perfect for couples looking to name their vessel based on their names and preferred style.

## Features

- Generate custom ship names by combining two names
- Choose from 10 different thematic styles
- Responsive design for mobile and desktop
- Powered by AI for creative and unique name generation

## Technologies Used

- Next.js (React framework)
- Tailwind CSS for styling
- Vercel AI SDK for AI integration
- OpenAI's GPT models for name generation

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- NPM or Yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ship-name-generator.git
   cd ship-name-generator
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

### Running the Development Server

```
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```
npm run build
# or
yarn build
```

Then, you can start the production server:

```
npm run start
# or
yarn start
```

## Deployment

This project is optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

Don't forget to add the `OPENAI_API_KEY` as an environment variable in your Vercel project settings.

## License

MIT 