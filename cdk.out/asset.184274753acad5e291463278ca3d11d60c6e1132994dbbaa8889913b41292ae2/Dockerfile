FROM cirrusci/flutter:stable

WORKDIR /app

# Cache dependencies
COPY pubspec.* ./
RUN flutter pub get

# Copy the rest of the application
COPY . .

# Build the application
RUN flutter build apk --release
