# Use the official Node.js 20 image as the base image.
FROM node:20-alpine AS base

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the Next.js application.
RUN npm run build

# Production image, copy built assets and start server
FROM node:20-alpine AS production

# Set the working directory.
WORKDIR /app

# Copy only necessary files
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package*.json ./
COPY --from=base /app/next.config.ts ./

# Install only production dependencies
RUN npm install --production

# Expose the port that Next.js will listen on.
EXPOSE 3000

# Set the startup command.
CMD ["npm", "start"]
