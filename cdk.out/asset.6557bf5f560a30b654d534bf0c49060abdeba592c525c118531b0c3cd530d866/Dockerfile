# Utiliza una imagen de Flutter
FROM cirrusci/flutter:stable

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos pubspec en el contenedor
COPY ./pubspec.* /app/

# Ejecuta 'flutter pub get' para obtener las dependencias
RUN flutter pub get --no-root-permissions

# Verifica los elementos copiados en la carpeta /app
RUN ls -la /app

# Copia el resto del código de la aplicación en el contenedor
COPY . /app/

# Ejecuta el comando predeterminado
CMD ["flutter", "build", "apk", "--release"]
