# Use Ubuntu 22 as the base image
FROM ubuntu:22.04

# Install libusb development headers
RUN apt-get update && \
    apt-get install -y libusb-1.0-0-dev

# Install essential tools
RUN apt-get install -y \
    curl \
    git

# Install Node.js using NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR="/root/.nvm"
RUN [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm install v6.17.1 && \
    nvm alias default v6.17.1 && \
    nvm use default

# Clone the MultiSigWallet repository
RUN git clone https://github.com/gnosis/MultiSigWallet.git
WORKDIR /MultiSigWallet/dapp

# Install node-gyp, grunt-cli, and dependencies
RUN npm install -g node-gyp grunt-cli --force && \
    npm install --force

# Build the web version
RUN npm run build-libs-web

RUN npm run start

# Run tests
# RUN npm test

# Expose the necessary port if applicable
# EXPOSE 3000

# Entry point if needed
# CMD ["npm", "start"]
