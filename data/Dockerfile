 # Create image based on the latest official Node image from the dockerhub
FROM mongo:latest

# Copy DATA
COPY /db /data/db

# Make the new dir a VOLUME to persists it
VOLUME /data/db

# Expose the port the app runs in
EXPOSE 27017







