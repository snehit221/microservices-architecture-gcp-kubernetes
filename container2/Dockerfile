FROM node

# specifying the current working dir, path will be created if does not exist.
WORKDIR /app

# copy the files to the curr work dir
COPY package*.json ./

# Install the app dependencies
RUN npm install
COPY . .

# exposing the port which the app will run on
EXPOSE 3000

# running in EXEC form
CMD ["npm", "start"]







 
