# FROM ubuntu:18.04
   
# # Prerequisites
# RUN apt update && apt install -y curl git unzip xz-utils zip libglu1-mesa openjdk-11-jdk wget
   
# # Set up new user
# RUN useradd -ms /bin/bash developer
# USER developer
# WORKDIR /home/developer
   
# # Prepare Android directories and system variables
# RUN mkdir -p Android/sdk
# ENV ANDROID_SDK_ROOT /home/developer/Android/sdk
# RUN mkdir -p .android && touch .android/repositories.cfg



# # Set up Android SDK
# RUN wget -O sdk-tools.zip https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
# RUN unzip sdk-tools.zip && rm sdk-tools.zip
# RUN mv tools Android/sdk/tools

# USER root
# RUN apt update && apt install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libxkbcommon-x11-0 libxcomposite1 libxrandr2 libjaxb-java

# # Install the required JAXB dependencies manually
# RUN wget -q -O /usr/share/java/jaxb-api.jar https://repo1.maven.org/maven2/javax/xml/bind/jaxb-api/2.3.1/jaxb-api-2.3.1.jar && \
#     wget -q -O /usr/share/java/jaxb-runtime.jar https://repo1.maven.org/maven2/com/sun/xml/bind/jaxb-impl/2.3.1/jaxb-impl-2.3.1.jar && \
#     wget -q -O /usr/share/java/jaxb-core.jar https://repo1.maven.org/maven2/com/sun/xml/bind/jaxb-core/2.3.0.1/jaxb-core-2.3.0.1.jar && \
#     wget -q -O /usr/share/java/jaxb-xjc.jar https://repo1.maven.org/maven2/com/sun/xml/bind/jaxb-xjc/2.3.1/jaxb-xjc-2.3.1.jar


# # RUN cd Android/sdk/tools/bin && yes | ./sdkmanager --licenses
# RUN cd Android/sdk/tools/bin && yes | java -cp "/usr/share/java/*" com.android.sdklib.tool.sdkmanager.SdkManagerCli --licenses
# # RUN cd Android/sdk/tools/bin && ./sdkmanager "build-tools;29.0.2" "patcher;v4" "platform-tools" "platforms;android-29" "sources;android-29"
# RUN cd Android/sdk/tools/bin && java -cp "/usr/share/java/*" com.android.sdklib.tool.sdkmanager.SdkManagerCli "build-tools;29.0.2" "patcher;v4" "platform-tools" "platforms;android-29" "sources;android-29"
# ENV PATH "$PATH:/home/developer/Android/sdk/platform-tools"

# # Download Flutter SDK
# RUN git clone https://github.com/flutter/flutter.git -b 3.18.0-18.0.pre --depth 1
# ENV PATH "$PATH:/home/developer/flutter/bin"
   
# # Run basic check to download Dark SDK
# RUN flutter doctor

# # Set the working directory to the project directory
# WORKDIR /app
# # Change ownership to the developer user
# RUN chown -R $USER:$USER /app

# # Copy project files into the container
# COPY ./ /app
# # Switch to the developer user
# USER $USER

# # Get Flutter dependencies
# RUN flutter pub get

# RUN flutter build apk --release


FROM ubuntu:18.04

# Prerequisites
RUN apt update && apt install -y curl git unzip xz-utils zip libglu1-mesa openjdk-11-jdk wget

# Set up new user
RUN useradd -ms /bin/bash developer
USER developer
WORKDIR /home/developer

# Prepare Android directories and system variables
RUN mkdir -p Android/sdk
ENV ANDROID_SDK_ROOT /home/developer/Android/sdk
RUN mkdir -p .android && touch .android/repositories.cfg

# Set up Android SDK
RUN wget -O commandlinetools-linux.zip https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip
RUN mkdir -p Android/sdk/cmdline-tools
RUN unzip commandlinetools-linux.zip -d Android/sdk/cmdline-tools
RUN rm commandlinetools-linux.zip
RUN mv Android/sdk/cmdline-tools/cmdline-tools Android/sdk/cmdline-tools/latest

# Add required dependencies for Java 11 and missing JAXB libraries
USER root
RUN apt update && apt install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libxkbcommon-x11-0 libxcomposite1 libxrandr2

# Accept licenses
RUN cd Android/sdk/cmdline-tools/latest/bin && yes | ./sdkmanager --licenses

# Install required Android SDK components
RUN cd Android/sdk/cmdline-tools/latest/bin && ./sdkmanager "build-tools;29.0.2" "platform-tools" "platforms;android-29" "sources;android-29"
ENV PATH "$PATH:/home/developer/Android/sdk/platform-tools:/home/developer/Android/sdk/cmdline-tools/latest/bin"

# Download Flutter SDK
USER developer
RUN git clone https://github.com/flutter/flutter.git -b 3.18.0-18.0.pre --depth 1
ENV PATH "$PATH:/home/developer/flutter/bin"

WORKDIR /app
# Change ownership to the developer user
RUN chown -R $USER:$USER /app

# Copy project files into the container
COPY ./ /app
# Switch to the developer user
USER $USER

# Get Flutter dependencies
RUN flutter pub get

RUN flutter build apk --release
