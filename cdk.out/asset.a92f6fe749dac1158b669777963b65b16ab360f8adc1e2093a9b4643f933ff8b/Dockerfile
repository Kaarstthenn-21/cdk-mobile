# Etapa de construcción
FROM debian:bullseye-slim AS build-env

# Instala las dependencias necesarias
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    wget \
    openjdk-11-jdk \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Instala Flutter SDK
RUN git clone https://github.com/flutter/flutter.git /flutter \
    && /flutter/bin/flutter --version

# Añadir Flutter al PATH
ENV PATH="/flutter/bin:/flutter/bin/cache/dart-sdk/bin:${PATH}"

# Verifica la instalación de Flutter
RUN flutter doctor -v

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo pubspec y descarga las dependencias
COPY pubspec.yaml pubspec.lock ./
RUN flutter pub get

# Copia el resto del código de la aplicación
COPY . .

# Compila la aplicación Flutter
RUN flutter build apk --release

# Etapa final
FROM debian:bullseye-slim

# Instala OpenJDK
RUN apt-get update && apt-get install -y \
    openjdk-11-jre-headless \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo
WORKDIR /app

# Copia el artefacto de compilación desde el stage de compilación
COPY --from=build-env /app/build/app/outputs/flutter-apk/app-release.apk ./app-release.apk
