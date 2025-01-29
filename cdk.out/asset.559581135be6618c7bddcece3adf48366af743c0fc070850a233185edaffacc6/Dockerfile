# Usar una imagen base con Flutter preinstalado
FROM cirrusci/flutter:stable

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos necesarios para obtener las dependencias de Flutter
COPY ../pubspec.* ./

# Obtener las dependencias de Flutter
RUN flutter pub get

# Copiar el resto de los archivos de la aplicación Flutter
COPY ../ ./

# Compilar la aplicación Flutter
RUN flutter build apk --release

# Definir el comando por defecto
CMD ["echo", "Flutter build complete"]
